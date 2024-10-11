"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const revealVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative bg-black py-16 overflow-hidden">
      <div className="absolute top-0 w-full h-20 md:h-24 bg-[#830e70] z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-4 text-white mt-4 md:mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={revealVariant}
        >
          FUNKSJONER
        </motion.h2>
        <motion.div
          className="flex justify-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariant}
        >
          <span className="w-12 h-1 bg-white inline-block rounded-full"></span>
        </motion.div>
      </div>

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/preloader2.png"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/gg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative container mx-auto px-6 z-20 mt-24 md:mt-28">
        <div className="flex flex-col space-y-8">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={revealVariant}
          >
            <motion.div
              className="flex flex-col text-left p-6 bg-white bg-opacity-80 rounded-lg shadow-lg md:w-1/2"
              variants={revealVariant}
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                Reduser kostnader
              </h3>
              <p className="text-black">
                Senk kostnadene og effektiviser rekrutteringsprosessen med
                InstaCruiter! Vi tilbyr en kostnadseffektiv løsning som sparer
                deg for annonseringsutgifter og tid brukt på screenings- og
                intervjuprosesser.
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center md:w-1/2"
              variants={revealVariant}
            >
              <Image
                src="/10001.svg"
                alt="Feature 1"
                width={200}
                height={200}
                className="filter-red"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row-reverse items-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={revealVariant}
          >
            <motion.div
              className="flex flex-col text-left p-6 bg-white bg-opacity-80 rounded-lg shadow-lg md:w-1/2"
              variants={revealVariant}
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                Smartannonsering
              </h3>
              <p className="text-black">
                Maksimer synligheten din med smartannonsering fra InstaCruiter!
                Vi hjelper deg med å nå ut til et bredere spekter av kandidater
                ved å målrette annonsene dine mot potensielle talenter.
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center md:w-1/2"
              variants={revealVariant}
            >
              <Image
                src="/10002.svg"
                alt="Feature 2"
                width={200}
                height={200}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row items-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={revealVariant}
          >
            <motion.div
              className="flex flex-col text-left p-6 bg-white bg-opacity-80 rounded-lg shadow-lg md:w-1/2"
              variants={revealVariant}
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                Automatisering
              </h3>
              <p className="text-black">
                Med automatisering fra InstaCruiter, tar vi
                rekrutteringsprosessen til nye høyder! Vår plattform er designet
                for å både erstatte og forsterke tradisjonelle
                stillingsannonser.
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center md:w-1/2"
              variants={revealVariant}
            >
              <Image
                src="/10003.svg"
                alt="Feature 3"
                width={200}
                height={200}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
