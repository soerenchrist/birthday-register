import type { Metadata } from "next";
import "./globals.css";

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
        className="antialiased"
      >
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
