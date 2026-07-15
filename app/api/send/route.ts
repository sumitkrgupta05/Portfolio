import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Validate form fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 2. Fetch the environment API key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable on the server.");
      return NextResponse.json(
        { error: "Mail service is not configured on the server. Please define RESEND_API_KEY." },
        { status: 500 }
      );
    }

    // 3. Post payload to Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "skgsumit5@gmail.com",
        subject: `[Portfolio Contact Request] ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #1e293b; background-color: #fafafa; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: auto;">
            <h2 style="color: #2563eb; font-size: 20px; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0;">New Contact Form Message</h2>
            <div style="margin-top: 16px; margin-bottom: 16px; font-size: 14px; line-height: 1.6;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="margin-top: 24px; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin-top: 0; font-weight: bold; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Message Details:</p>
              <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 0;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 28px; margin-bottom: 0;">
              This email was generated automatically by the Portfolio Contact Form.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API response failed:", errorText);
      return NextResponse.json(
        { error: `Mail service error: ${response.statusText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("Exception in Contact API Route:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending the email." },
      { status: 500 }
    );
  }
}
