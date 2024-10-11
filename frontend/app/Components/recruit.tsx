"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SectionOne() {
  return (
    <motion.div
      className="bg-black text-white py-16 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Vi presenterer en nyskapende tilnærming til rekruttering.
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Instacruit er en avansert plattform som bruker maskinlæring og kunstig
          intelligens for å øke antallet kvalifiserte kandidater tilgjengelige
          for stillinger. Vi revolusjonerer den tradisjonelle stillingsannonsen
          ved å tilby en dedikert nettside som gir en kortfattet oversikt over
          stillingen og muliggjør en sømløs søknadsprosess for kandidatene.Vår
          plattform forenkler også rekrutteringsprosessen for arbeidsgivere ved
          å tilby effektiv håndtering, evaluering og kommunikasjon med alle
          søkere.
        </motion.p>
      </div>
    </motion.div>
  );
}
