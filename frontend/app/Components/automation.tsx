"use client";
import React from "react";
import { motion } from "framer-motion";

const Automatisering = () => {
  return (
    <motion.div
      className="bg-black text-white p-8 md:p-16 flex flex-col items-center justify-center border border-[#830e70] mx-10 rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
        Automasjon
      </h2>
      <p className="mt-4 text-lg md:text-xl text-center w-full max-w-xl">
        Vi forbedrer måten bedrifter og jobbsøkere samhandler på ved å utvikle
        en sømløs og optimal plattform som gjør rekrutteringsprosessen enkel,
        intelligent og givende.
      </p>
    </motion.div>
  );
};

export default Automatisering;
