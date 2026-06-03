import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth Portal",
  description: "Authentication frontend for signup, login, and password recovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
