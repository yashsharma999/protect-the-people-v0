import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export const metadata: Metadata = {
  title: "PTP Foundation - Building Hope, Creating Impact, Transforming Lives",
  description: "PTP Foundation works to create lasting social change by strengthening access to education, healthcare, and community support for underserved communities. Our focus is on long-term impact, transparency, and real transformation at the grassroots level.",
  openGraph: {
    title: "PTP Foundation - Building Hope, Creating Impact, Transforming Lives",
    description: "PTP Foundation works to create lasting social change by strengthening access to education, healthcare, and community support for underserved communities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
