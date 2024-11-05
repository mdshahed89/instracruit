"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  companyName: string;
  email: string;
  phoneNumber: string;
  message: string;
  subscribe: boolean;
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    phoneNumber: "",
    message: "",
    subscribe: false,
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      setResponseMessage(data?.message);
      toast.success("Email sent successfully!");

      setFormData({
        companyName: "",
        email: "",
        phoneNumber: "",
        message: "",
        subscribe: false,
      });
    } catch (error) {
      setResponseMessage("Failed to send email.");
      toast.error("Failed to send email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black text-white p-10 md:p-20">
      <motion.div
        className="relative flex flex-col justify-center items-center text-center py-16"
        style={{
          // backgroundImage: 'url("/path-to-your-background.gif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <motion.h2 className="text-4xl font-bold mb-6">
          Registrer interesse
        </motion.h2>
        <motion.p className="text-lg leading-relaxed max-w-lg">
          Oppgi litt informasjon om din bedrift, og en av våre rådgivere fra
          InstaCruit vil kontakte deg innen 24 timer.
        </motion.p>
      </motion.div>

      <motion.div className="relative flex items-center justify-center">
        <motion.div className="relative z-10 p-8 mx-4 bg-black bg-opacity-90 rounded-lg shadow-lg max-w-2xl border-[#841F84] border-2 mb-20">
          <motion.h1 className="text-4xl font-bold mb-6 text-center">
            Kontakt oss
          </motion.h1>
          <motion.p className="mb-8 text-sm text-center">
            Trenger du hjelp med å rekruttere de rette kandidatene? Ta kontakt
            med oss!
          </motion.p>

          <motion.form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium mb-2"
              >
                Bedriftsnavn*
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData?.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Skriv inn navn her"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-post*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="E-postadresse"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium mb-2"
              >
                Mobilnummer
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Mobilnummer"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Melding
              </label>
              <textarea
                id="message"
                name="message"
                value={formData?.message}
                onChange={handleChange}
                className="w-full px-4 py-2 h-20 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Din melding..."
                required
              />
            </div>
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="subscribe"
                  checked={formData?.subscribe}
                  onChange={handleChange}
                  className="form-checkbox text-yellow-500 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500"
                />
                <span className="ml-2 text-sm">
                  Ja, jeg ønsker å motta informasjon og bli holdt oppdatert fra
                  Instacruit.
                </span>
              </label>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-transparent text-white border border-[#841F84] px-6 py-2 rounded-full hover:bg-[#866186] hover:text-black transition duration-300"
              disabled={loading}
            >
              {loading ? "Sender..." : "Send inn skjema"}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
