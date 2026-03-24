import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { formName, formLastname, formEmail, formPhone, formService, formMessage } = data;

    // Validation
    if (!formName || !formLastname || !formEmail || !formMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Nouveau message de contact : ${formService || 'Général'}`,
      text: `
        Nom: ${formLastname}
        Prénom: ${formName}
        Email: ${formEmail}
        Téléphone: ${formPhone || 'Non renseigné'}
        Service souhaité: ${formService || 'Non spécifié'}
        Message:
        ${formMessage}
      `,
      html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom:</strong> ${formLastname}</p>
        <p><strong>Prénom:</strong> ${formName}</p>
        <p><strong>Email:</strong> ${formEmail}</p>
        <p><strong>Téléphone:</strong> ${formPhone || 'Non renseigné'}</p>
        <p><strong>Service:</strong> ${formService || 'Non spécifié'}</p>
        <p><strong>Message:</strong></p>
        <p>${formMessage.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
