import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "InstaCruit: Kontakt oss for effektiv rekruttering",
  description: "Gi oss noen detaljer om din bedrift, og en av våre erfarne rådgivere fra InstaCruit vil ta kontakt med deg innen 24 timer for å hjelpe deg med rekrutteringen.",
  
  openGraph: {
    title: "InstaCruit: Kontakt oss for effektiv rekruttering",
    description: "Gi oss noen detaljer om din bedrift, og en av våre erfarne rådgivere fra InstaCruit vil ta kontakt med deg innen 24 timer for å hjelpe deg med rekrutteringen.",
    url: "https://instacruit.no/Kontakt_oss", 
    images: [
      {
        url: "/forSeo.png", 
        width: 1200, 
        height: 630, 
        alt: "Instacruit Kontakt", 
      },
    ],
    type: 'website', 
  },
  twitter: {
    card: 'summary_large_image', 
    title: "InstaCruit: Kontakt oss for effektiv rekruttering",
    description: "Gi oss noen detaljer om din bedrift, og en av våre erfarne rådgivere fra InstaCruit vil ta kontakt med deg innen 24 timer for å hjelpe deg med rekrutteringen.",
    images: [
      "/twitterCard.png", 
    ],
  },
};

export default function KontaktLayout({
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
