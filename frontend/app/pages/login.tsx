"use client";
import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState<boolean>(false); // New state

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Set the login as successful
        setIsLoginSuccessful(true); // Disable button after success

        setTimeout(() => {
          router.push(`/dashboard/${data._id}`);
        }, 1000);
      } else {
        setError(data.message || "Login failed.");
        toast.error("Login failed! Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="relative flex items-center justify-center min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("/path-to-your-gif.gif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <ToastContainer />
      <motion.div
        className="relative z-10 p-8 bg-black bg-opacity-90 rounded-lg shadow-lg max-w-sm border-[#841F84] border-2"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Logg Inn
        </motion.h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-post eller brukernavn
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="E-post eller brukernavn"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Passord"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading || isLoginSuccessful} // Disable after success
            className={`w-full px-6 py-2 rounded-full border ${
              isLoginSuccessful
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-transparent text-white border-[#841F84] hover:bg-[#866186] hover:text-black"
            } transition duration-300`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {loading
              ? "Logging in..."
              : isLoginSuccessful
              ? "Redirecting..."
              : "Logg Inn"}
          </motion.button>
        </motion.form>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-yellow-500 hover:underline">
            Glemt passord?
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
