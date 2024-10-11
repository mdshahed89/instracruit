"use client";
import React from "react";
import { motion } from "framer-motion";

const locations = [
  { name: "Norway", top: "30%", left: "40%" },
  { name: "Finland", top: "35%", left: "60%" },
  { name: "Sweden", top: "32%", left: "50%" },
];

export default function MapSection() {
  return (
    <motion.div
      className="relative flex justify-center items-center min-h-screen"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/path-to-your-map.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {locations.map((location, index) => (
        <motion.div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: location.top, left: location.left }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="w-8 h-8 bg-black text-white flex justify-center items-center rounded-full">
            {location.name[0]}{" "}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
