import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sörens 30er",
  description: "Party Hard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
