import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaCareers.in - AI-Driven Job Platform for Media Professionals",
  description: "Find specialized jobs for journalists, editors, PR specialists, corporate communicators, and content creators across India. AI-powered job search for media professionals.",
  keywords: ["media jobs", "journalism jobs", "content creator jobs", "PR jobs", "communications jobs", "India"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
