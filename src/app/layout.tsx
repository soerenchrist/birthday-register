import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { inter } from "./lib/fonts";

export const metadata: Metadata = {
  title: "Sörens 30er",
  description: "Party Hard",
  icons: {
    icon: [
      { url: "favicon.ico" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
