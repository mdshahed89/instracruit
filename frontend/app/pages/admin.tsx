"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

export default function AdminRegister() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.companyName,
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const data = await response.json();
      toast.success("User created successfully!");

      setFormData({
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create user.");
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
        <motion.h2 className="text-4xl font-bold mb-6">Admin Page</motion.h2>
      </motion.div>

      <motion.div className="relative flex items-center justify-center ">
        <motion.div className="relative z-10 p-8 mx-1 bg-black bg-opacity-90 rounded-lg shadow-lg w-[600] md:w-1/2 border-[#841F84] border-2 mb-20">
          <motion.h1 className="md:text-4xl text-2xl font-bold mb-6 text-center">
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

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Passord
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Password"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Bekreft passord
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="form-checkbox text-yellow-500 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500"
                />
                <span className="ml-2 text-sm">Husk meg</span>
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-transparent text-white border border-[#841F84] px-6 py-2 mt-4 rounded-full hover:bg-[#866186] hover:text-black transition duration-300"
              disabled={loading}
            >
              {loading ? "Sender..." : "REGISTRER DEG"}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}
