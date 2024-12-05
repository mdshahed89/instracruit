"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send-email`,
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
    <div className=" flex items-center w-full justify-center min-h-[100vh] ">

<div className=" bg-black text-white w-full  ">
      <motion.div
        className=" text-center px-3 "
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
        <motion.div initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
           className=" absolute top-[5%] left-[5%] " >
        <Link href={'/'} className="  rounded-full px-10 py-2 border-[#841F84] border ">Tilbake</Link>
      </motion.div>
        <motion.h2 className="md:text-4xl text-3xl font-bold mb-6">
          Registrer interesse
        </motion.h2>
        <motion.p className="text-lg leading-relaxed mx-auto max-w-lg text-[#a5a5a5] mb-10">
          Fyll inn litt informasjon om bedriften din, og en av Instacruit sine
          rådgivere tar kontakt innen 24 timer.
        </motion.p>
      </motion.div>

      <motion.div className=" w-full px-3 ">
        <motion.div className=" bg-black bg-opacity-90 rounded-lg shadow-lg w-full lg:px-16 md:px-10 px-5  md:py-12 py-6 mx-auto max-w-[600px] border-[#841F84] border-2">
          <motion.h1 className="md:text-4xl text-2xl  font-bold mb-12 text-center">
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
                className="w-full px-4 py-2 outline-none rounded-md bg-white text-black placeholder-gray-400 border border-gray-700  "
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
                className="w-full px-4 py-2 rounded-md outline-none bg-white text-black placeholder-gray-400 border border-gray-700 "
                placeholder="E-postadresse"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full font-semibold bg-transparent text-white border border-[#841F84] px-6 py-3 mt-10 rounded-full hover:bg-[#866186] hover:text-white transition duration-300"
              disabled={loading}
            >
              {loading ? "Sender..." : "Send"}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>

    </div>
  );
}
