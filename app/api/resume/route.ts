import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, you would serve the actual PDF file
    // For now, we'll redirect to a placeholder or return a response
    const pdfUrl = "/resume--commander.pdf"; // Your actual PDF file

    return NextResponse.redirect(
      new URL(
        pdfUrl,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      )
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Resume not available" },
      { status: 404 }
    );
  }
}
