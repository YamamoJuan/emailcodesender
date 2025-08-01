// src/app/api/send-code/route.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return Response.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000); // generate 6 digit code
    console.log("TARGET EMAIL:", email);
    console.log("GENERATED CODE:", code);

    const htmlContent = `
      <div style="text-align:center; font-family:sans-serif;">
        <h2 style="color:#064F3B;">kode kodean</h2>
        <p>ini kode</p>
        <h1 style="font-size:32px; letter-spacing:4px;">${code}</h1>
        <img 
          src="https://cdn.discordapp.com/attachments/1286554614941880330/1400756447092146186/2f8e81604dc123d8fdacedf15561bf0d.jpg?ex=688dcb99&is=688c7a19&hm=bec4bbf1f5751cfbe70eae507a03e7517bcd5cbe07826183e3a12de334da8099" 
          alt="Banner"
          style="margin-top:20px; border-radius:10px;" 
          width="300"
        />
        <p style="font-size:12px; color:#999;">Kalau bukan kamu, abaikan email ini.</p>
        <p style="font-size:11px; color:#aaa; margin-top:40px;">— K.</p>
      </div>
    `;

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'itu kode nya ya',
      html: htmlContent,
    });

    console.log("SEND RESULT:", data);
    return Response.json({ success: true });
  } catch (error) {
    console.error("SEND ERROR:", error);
    return Response.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
