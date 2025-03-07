import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Providers from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "면접 타운",
  description: "개발자 면접을 함께 연습하는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col h-screen">
        <Providers>
          <HeaderWrapper />
          <main className="flex-1 overflow-y-auto">{children}</main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
