import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'flowbite'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/components/providers/SessionProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DKAPI",
  description: "Open-Source API marketplace for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
          <div className="container mx-auto px-2">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}