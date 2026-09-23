import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseDesk — Support Dashboard Concept",
  description: "A responsive customer support dashboard concept built with React and TypeScript.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
