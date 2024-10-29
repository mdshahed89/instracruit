import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-Montserrat antialiased`}
      >
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        <ToastContainer />
      </body>
    </html>
  );
}
