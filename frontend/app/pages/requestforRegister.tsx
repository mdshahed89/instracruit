"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  companyName: string;
  email: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://instacruit-backend.vercel.app/api/send-email",
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
      toast.success("Request sent successfully!");

      setFormData({
        companyName: "",
        email: "",
      });
    } catch (error) {
      toast.error("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black text-white p-10 md:p-20">
      <motion.div
        className="relative flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: 'url("/path-to-your-background.gif")',
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
        <motion.p className="text-lg leading-relaxed max-w-lg md:mb-10">
          Fyll inn litt informasjon om bedriften din, og en av Instacruit sine
          rådgivere tar kontakt innen 24 timer.
        </motion.p>
      </motion.div>

      <motion.div className="relative flex items-center justify-center ">
        <motion.div className="relative z-10 p-8 mx-1 bg-black bg-opacity-90 rounded-lg shadow-lg w-[600] md:w-1/2 border-[#841F84] border-2 mb-20">
          <motion.h1 className="md:text-4xl text-2xl  font-bold mb-6 text-center">
            Registrer her
          </motion.h1>
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
                value={formData.companyName}
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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="E-postadresse"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-transparent text-white border border-[#841F84] px-6 py-2 mt-4 rounded-full hover:bg-[#866186] hover:text-black transition duration-300"
              disabled={loading}
            >
              {loading ? "Sender..." : "Send"}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
