import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
    title: "Error Games",
    description: "에러 게임즈 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="ko">
        <body className="bg-black text-white">
          <Navbar />
          {children}
        </body>
      </html>
  );
}
