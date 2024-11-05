import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "InstaCruit - Få Kvalifiserte Kandidater med Vårt Rekrutteringsverktøy",
  description: "InstaCruit: Sikre deg de beste, kvalifiserte kandidatene med InstaCruiter - ditt pålitelige verktøy for effektiv rekruttering. Oppdag hvordan vi kan hjelpe deg!",
  
  openGraph: {
    title: "InstaCruit - Få Kvalifiserte Kandidater med Vårt Rekrutteringsverktøy",
    description: "InstaCruit: Sikre deg de beste, kvalifiserte kandidatene med InstaCruiter - ditt pålitelige verktøy for effektiv rekruttering. Oppdag hvordan vi kan hjelpe deg!",
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
    title: "InstaCruit - Få Kvalifiserte Kandidater med Vårt Rekrutteringsverktøy",
    description: "InstaCruit: Sikre deg de beste, kvalifiserte kandidatene med InstaCruiter - ditt pålitelige verktøy for effektiv rekruttering. Oppdag hvordan vi kan hjelpe deg!",
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
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" />
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
