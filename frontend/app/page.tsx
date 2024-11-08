import Image from "next/image";
import Hero from "./Components/hero";
import FeaturesSection from "./Components/functions";
import Automatisering from "./Components/automation";
import AboutXcruiter from "./Components/about";
import SectionOne from "./Components/recruit";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";

export default async function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />

      <div className=" bg-black ">
      <FeaturesSection />
      <Automatisering />

      <AboutXcruiter />
      <SectionOne />
      <Footer />
      </div>
    </div>
  );
}
