import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Instacruit - Finn Pålitelige Kvalifiserte Kandidater",
  description: "Instacruit: Sikre deg de beste, kvalifiserte kandidatene med Instacruiter - ditt pålitelige verktøy for effektiv rekruttering. Oppdag hvordan vi kan hjelpe deg!",
  
  openGraph: {
    title: "Instacruit - Finn Pålitelige Kvalifiserte Kandidater",
    description: "Instacruit: Sikre deg de beste, kvalifiserte kandidatene med Instacruiter - ditt pålitelige verktøy for effektiv rekruttering. Oppdag hvordan vi kan hjelpe deg!",
    url: "https://instacruit.no/", 
    images: [
      {
        url: "/forSeo.png", 
        width: 1200, 
        height: 630, 
        alt: "Instacruit Job Search", 
      },
    ],
    type: 'website', 
  },
  twitter: {
    card: 'summary_large_image', 
    title: "Instacruit - Finn Pålitelige Kvalifiserte Kandidater",
    description: "Instacruit: Sikre deg de beste, kvalifiserte kandidatene med Instacruiter - ditt pålitelige verktøy for effektiv rekruttering. Oppdag hvordan vi kan hjelpe deg!",
    images: [
      "/twitterCard.png", 
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
      </head>
      <body className={`font-Montserrat antialiased`}>
        <div style={{ position: 'relative', zIndex: 15 }}>
          {children}
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
