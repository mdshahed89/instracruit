"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

// Define the array of FAQs with type annotations
const faqs: FAQItem[] = [
  {
    question: "Har Xcruiter en database med personer åpen for å bytte jobb?",
    answer:
      "Ja, Xcruiter har en database med personer som er åpne for nye jobber. Ja, Xcruiter har en database med personer som er åpne for nye jobber.",
  },
  {
    question: "Benyttes databasen til å hente ut annen informasjon?",
    answer:
      "Databasen benyttes kun for rekrutteringsformål og all data behandles konfidensielt.",
  },
  {
    question: "Hvordan bidrar kampanjene til Xcruiter til employer branding?",
    answer:
      "Xcruiter sine kampanjer hjelper selskaper med å styrke sitt employer brand ved å synliggjøre sine verdier og kultur.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="bg-black text-black p-8 md:p-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
        Ofte stilte spørsmål
      </h2>
      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
            layout
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <FaPlus
                  className={`transition-transform duration-200 text-[#841F84] ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                />
              </motion.div>
            </div>
            {openIndex === index && (
              <motion.p
                className="mt-2 text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
