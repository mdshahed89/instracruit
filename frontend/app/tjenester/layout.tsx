import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "InstaCruit: Profesjonelle Tjenester for Rekruttering og Mer",
  description: "Velkommen til vår tjenesteside! Vi tilbyr profesjonelle tjenester for rekruttering, markedsføring, nettsider og logo-design av høyeste kvalitet.",
  
  openGraph: {
    title: "InstaCruit: Profesjonelle Tjenester for Rekruttering og Mer",
    description: "Velkommen til vår tjenesteside! Vi tilbyr profesjonelle tjenester for rekruttering, markedsføring, nettsider og logo-design av høyeste kvalitet.",
    url: "https://instacruit.no/tjenester", 
    images: [
      {
        url: "/forSeo.png", 
        width: 1200, 
        height: 630, 
        alt: "Instacruit tjenester", 
      },
    ],
    type: 'website', 
  },
  twitter: {
    card: 'summary_large_image', 
    title: "InstaCruit: Profesjonelle Tjenester for Rekruttering og Mer",
    description: "Velkommen til vår tjenesteside! Vi tilbyr profesjonelle tjenester for rekruttering, markedsføring, nettsider og logo-design av høyeste kvalitet.",
    images: [
      "/twitterCard.png", 
    ],
  },
};

export default function TjenesterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div>
          {children}
        </div>
      
  );
}
