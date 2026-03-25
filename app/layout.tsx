import type { Metadata, Viewport } from "next";
import { Literata, Lora } from "next/font/google";

import { PlausibleScript } from "@/components/analytics/plausible-script";
import { ThemeBootstrapScript } from "@/components/layout/theme-bootstrap";

import "./globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const literata = Literata({
  subsets: ["latin", "vietnamese", "latin-ext"],
  variable: "--font-literata",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Bảo Vệ Đức Tin Công Giáo Khi Bị Thách Thức: Báo Cáo Nghiên Cứu Chuyên Sâu",
    template: "%s | Bảo Vệ Đức Tin Công Giáo",
  },
  description:
    "Báo cáo phân tích chuyên sâu về phương pháp và nội dung biện giáo Công giáo đương đại: nền tảng tinh thần, chiến thuật đối thoại, và cứ liệu thần học.",
  openGraph: {
    title: "Bảo Vệ Đức Tin Công Giáo Khi Bị Thách Thức: Báo Cáo Nghiên Cứu Chuyên Sâu",
    description:
      "Bài đọc định dạng học thuật về phương pháp và nội dung biện giáo Công giáo đương đại.",
    type: "article",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bảo Vệ Đức Tin Công Giáo Khi Bị Thách Thức: Báo Cáo Nghiên Cứu Chuyên Sâu",
    description:
      "Bài đọc định dạng học thuật về phương pháp và nội dung biện giáo Công giáo đương đại.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${lora.variable} ${literata.variable} h-full`}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <ThemeBootstrapScript />
        <PlausibleScript />
        {children}
      </body>
    </html>
  );
}
