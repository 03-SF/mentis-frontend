import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mentis AI - Your Career Co-Pilot",
  description: "AI-powered career guidance for Pakistani students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
