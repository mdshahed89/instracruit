import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "InstaCruit: Lær Mer om Vårt Team og Vår Visjon",
  description: "Oppdag InstaCruit! Vi er dedikert til å koble kvalifiserte kandidater med ledige stillinger. Les mer om vårt engasjerte team og vår visjon.",
  
  openGraph: {
    title: "InstaCruit: Lær Mer om Vårt Team og Vår Visjon",
    description: "Oppdag InstaCruit! Vi er dedikert til å koble kvalifiserte kandidater med ledige stillinger. Les mer om vårt engasjerte team og vår visjon.",
    url: "https://instacruit.no/Om_Oss", 
    images: [
      {
        url: "/forSeo.png", 
        width: 1200, 
        height: 630, 
        alt: "Instacruit Om_Oss", 
      },
    ],
    type: 'website', 
  },
  twitter: {
    card: 'summary_large_image', 
    title: "InstaCruit: Lær Mer om Vårt Team og Vår Visjon",
    description: "Oppdag InstaCruit! Vi er dedikert til å koble kvalifiserte kandidater med ledige stillinger. Les mer om vårt engasjerte team og vår visjon.",
    images: [
      "/twitterCard.png", 
    ],
  },
};

export default function OmosstLayout({
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
