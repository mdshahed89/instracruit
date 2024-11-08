"use client";
import React from "react";
import { motion } from "framer-motion";

const Automatisering = () => {
  return (
    <div className=" bg-black pt-10 px-3 ">
      <motion.div
      className="   text-center border-[#830e70] border py-10 rounded-xl  "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
        Automasjon
      </h2>
      <p className="mt-4 text-lg md:text-xl text-center w-full mx-auto max-w-xl">
        Vi forbedrer måten bedrifter og jobbsøkere samhandler på ved å utvikle
        en sømløs og optimal plattform som gjør rekrutteringsprosessen enkel,
        intelligent og givende.
      </p>
    </motion.div>
    </div>
  );
};

export default Automatisering;
