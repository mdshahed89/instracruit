"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBullhorn, FaLaptop, FaPencilAlt } from "react-icons/fa";
import Link from "next/link";

const services = [
  {
    title: "Rekruttering",
    description: "Vi hjelper deg med å finne de beste talentene til ditt team.",
    icon: FaUsers,
    route: "/Kontakt_oss",
  },
  {
    title: "Markedsføring",
    description: "Øk synligheten din med våre markedsføringstjenester.",
    icon: FaBullhorn,
    route: "/Kontakt_oss",
  },
  {
    title: "Nettside",
    description: "Fa en profesjonell nettside som tiltrekker kunder.",
    icon: FaLaptop,
    route: "/nettside1",
  },
  {
    title: "Logo",
    description: "Design av unike logoer som representerer ditt merke.",
    icon: FaPencilAlt,
    route: "/nettside1",
  },
];

const Tjenester = () => {
  return (
    <section className="bg-black text-white px-6 py-16 lg:px-20 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-4 text-center mt-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          Våre Tjenester
        </motion.h1>
        <motion.p
          className="text-lg text-gray-white text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          Velkommen til vår tjenesteside! Her tilbyr vi et spekter av
          profesjonelle tjenester for å hjelpe deg med å nå dine mål. Enten du
          trenger hjelp med rekruttering, markedsføring, nettsider eller
          logo-design, har vi ekspertisen og erfaringen for å levere arbeid av
          høyeste kvalitet. La oss samarbeide for å bygge ditt merke og styrke
          din tilstedeværelse i markedet.
        </motion.p>

        {/* Responsive Grid Layout for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-lg p-6 relative transition-transform transform hover:scale-105 hover:bg-opacity-90 flex flex-col justify-center items-center min-h-40 overflow-hidden duration-500"
            >
              <div className="icon bg-gray-800 group-hover:bg-[#830e70] text-white p-6 rounded-full mb-4 w-16 h-16 flex items-center justify-center transition-colors duration-300">
                <service.icon className="text-2xl" />
              </div>
              <h3 className="font-bold text-xl text-black text-center">
                {service.title}
              </h3>
              <p className="transition-opacity duration-300 text-center text-gray-700 mt-2">
                {service.description}
              </p>
              <Link
                href={service.route}
                className="transition-opacity duration-300 bg-[#830e70] text-white font-bold py-2 px-4 rounded-full mt-4 text-center"
              >
                Ta Kontakt!
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tjenester;
