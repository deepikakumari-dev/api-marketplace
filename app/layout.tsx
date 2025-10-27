import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'flowbite'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/components/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserOrganizations } from "@/lib/data/org";


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  const orgs = await getUserOrganizations(session?.user.id)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header orgs={orgs} />
          <div className="">
            {children}
          </div>
          {/* <Footer /> */}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}