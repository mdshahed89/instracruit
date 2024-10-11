"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionTwo from "../Components/section2";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="bg-[#830e70] text-white px-6 py-16 lg:px-20 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-10 text-center mt-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          Om oss
        </motion.h1>

        <motion.div
          className="grid gap-12 md:grid-cols-2 items-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col items-center bg-black p-8 rounded-lg shadow-md"
          >
            <Image
              src="/10004.svg"
              alt="Feature 1"
              width={150}
              height={150}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold mb-4 text-center">
              Vår visjon
            </h2>
            <p className="text-base leading-relaxed text-center">
              Vår ambisjon hos InstaCruiter er å revolusjonere
              rekrutteringslandskapet ved å tilby en sømløs og intelligent
              plattform som forenkler møtet mellom selskaper og kandidater. Vi
              streber etter å være en nøkkelfaktor for suksess, både for
              organisasjoner og enkeltpersoner, ved å tilby banebrytende
              løsninger som effektivt matcher talent med muligheter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col items-center bg-black p-8 rounded-lg shadow-md"
          >
            <Image
              src="/10005.svg"
              alt="Feature 2"
              width={150}
              height={150}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold mb-4 text-center">
              Vår tilnærming til rekruttering
            </h2>
            <p className="text-base leading-relaxed text-center">
              Vi tar rekruttering til nye høyder ved å omfavne teknologi for å
              gjøre prosessen smidigere og mer presis. Vår tilnærming er grundig
              datadrevet, med fokus på å identifisere og engasjere de beste
              talentene ved hjelp av avanserte kvalitetssikringsmetoder og
              kunstig intelligens. I tillegg verdsetter vi å skape varige
              partnerskap med både bedrifter og kandidater for å sikre gjensidig
              suksess.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center bg-black p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Image
            src="/10006.svg"
            alt="Feature 3"
            width={150}
            height={150}
            className="mb-4"
          />
          <h2 className="text-xl font-semibold mb-4 text-center">
            Vår teknologi
          </h2>
          <p className="text-base leading-relaxed text-center">
            Med vår avanserte teknologi har vi revolusjonert
            rekrutteringsprosessen for å være mer effektiv enn noensinne. Vår
            plattform integrerer kunstig intelligens, grundig kvalitetssikring
            og analytiske verktøy for å identifisere og evaluere de mest
            kvalifiserte kandidatene. Vi har skapt et verktøy som gjør det mulig
            å søke gjennom enorme mengder data på rekordtid, og finner skjulte
            talenter som ellers kunne gått ubemerket hen. Vi forplikter oss til
            å være i forkant av teknologiske fremskritt og kontinuerlig forbedre
            vår plattform for å sikre at våre kunder opplever de beste
            resultatene.
          </p>
        </motion.div>
      </div>
      <SectionTwo />
    </section>
  );
};

export default AboutUs;
