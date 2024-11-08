import React from "react";
import Tjenester from "../pages/tjenester";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

async function Page() {
  return (
    <div>
      <Navbar />
      <div className="">
        <Tjenester />
      </div>
      <Footer />
    </div>
  );
}

export default Page;
