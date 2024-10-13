"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";


interface FormData {
  companyName: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",

    message: "",
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/send-email-sideone`,
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
      setResponseMessage(data.message);
      toast.success("Email sent successfully!");

      setFormData({
        companyName: "",
        email: "",

        message: "",
      });
    } catch (error) {
      setResponseMessage("Failed to send email.");
      toast.error("Failed to send email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-black flex items-center justify-center min-h-screen p-10">
        <div className="flex flex-col gap-10 md:flex-row items-stretch justify-center mt-20 pt-10 w-full max-w-6xl mx-auto">
          <div className="bg-[#222121] p-8 rounded-lg w-full md:w-1/2 text-white mb-8 md:mb-0 flex flex-col justify-between">
            <h1 className="text-xl font-bold mb-4 text-center">
              Ønsker du en profesjonell logo for din bedrift? Kontakt oss i
              Sidesone for skreddersydde løsninger!
            </h1>

            <div className="flex items-center mb-4 justify-between">
              <img src="/logo.png" alt="Instacruit" className="w-28" />
              <span className="text-2xl">+</span>
              <img
                src="/new-darker-logo-300x50.png"
                alt="Sidesone"
                className="w-28"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Navn</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full mb-4 p-3 rounded-3xl bg-gray-700 text-white outline-none"
                placeholder="Navn"
                required
              />
              <label className="block mb-2">Epost</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-4 p-3 rounded-3xl bg-gray-700 text-white outline-none"
                placeholder="Epost"
                required
              />
              <label className="block mb-2">Beskriv din logo</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mb-4 p-3 rounded-3xl bg-gray-700 text-white outline-none"
                placeholder="Beskriv din logo"
                rows={4}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full  to-[#3c032e] p-3 rounded text-white font-bold hover:bg-pink-800 transition duration-300
                "
                style={{
                  background:
                    "linear-gradient(180deg, #007f64 0%, #4caf50 100%)",
                }}
                disabled={loading}
              >
                {loading ? "Sender..." : "Send"}
              </button>
            </form>
          </div>

          <div
            className="p-8 rounded-lg w-full md:w-1/3 shadow-lg text-white flex flex-col items-center justify-between"
            style={{
              background: "linear-gradient(180deg, #007f64 0%, #4caf50 100%)",
            }}
          >
            <img
              src="/DSC00580.png"
              alt="Sidesone Profile"
              className="w-44 h-44 rounded-full mb-4 transform transition-transform duration-300 hover:scale-110"
            />
            <h2 className="text-4xl font-bold mb-2">Sidesone</h2>
            <p className="text-center text-xl mb-6">
              "Vi bygger nettside for folk som liker å bevege seg raskt. Bestill
              nå for å komme i gang!"
            </p>

            <div className="flex flex-col items-center text-sm mb-6">
              <div className="flex items-center mb-2">
                <CiGlobe className="mr-2" size={18} />
                <a href="https://Sidesone.no" className="text-white">
                  Sidesone.no
                </a>
              </div>
              <div className="flex items-center mb-2">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:kontakt@sidesone.no"
                  className="text-white text-lg"
                >
                  kontakt@sidesone.no
                </a>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <p className="text-white text-lg">+47 13 65 07</p>
              </div>
            </div>

            <Link target="_blank" href={`https://sidesone.no`}>
            <button className="bg-white text-green-500 font-bold py-3 px-10 rounded-lg hover:bg-gray-100 transition duration-300">
              Besøk oss
            </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
