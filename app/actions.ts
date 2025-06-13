"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required" };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <contact@operative.dev>",
      to: "arnwolfie5@gmail.com", 
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Email error:", error);
      return { success: false, message: "Failed to send message" };
    }

    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
