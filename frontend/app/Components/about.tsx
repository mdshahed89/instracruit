"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutXcruiter = () => {
  return (
    <motion.div
      className="bg-black text-white p-8 md:p-16 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Instacruit leverer kvalitetssikrede rekrutteringer av fagpersonell,
        nyutdannede og spesialister
      </motion.h2>
      <a href="/Om_Oss">
        <motion.button
          className="mt-10 py-4 px-10 bg-[#830e70] text-white font-semibold rounded-xl hover:bg-[#bd99bd] transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Om Instacruit
        </motion.button>
      </a>
    </motion.div>
  );
};

export default AboutXcruiter;
