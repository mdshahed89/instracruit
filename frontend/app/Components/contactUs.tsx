"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <motion.div
      className="relative flex flex-col justify-center items-start min-h-screen bg-black text-white p-10 md:p-20"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <motion.h2
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Registrer interesse
      </motion.h2>
      <motion.p
        className="text-lg leading-relaxed max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Oppgi litt informasjon om din bedrift, og en av våre rådgivere fra
        InstaCruit vil kontakte deg innen 24 timer.
      </motion.p>
    </motion.div>
  );
}
