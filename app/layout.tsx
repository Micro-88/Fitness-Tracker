import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/app/ui/global.css";

export const metadata: Metadata = {
  title: "Fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
