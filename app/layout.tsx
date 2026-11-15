import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HTH (Hub to Hub)",
  description: "Digital growth and automation agency.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
