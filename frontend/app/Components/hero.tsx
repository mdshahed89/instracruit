"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Hero: React.FC = () => {
  const text = "Velkommen til instacruit";
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode<{ id: string }>(token);
      setUserId(decodedToken?.id)
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  console.log(userId);
  

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      // console.log("not authenticated");
      
      router.push(`/dashboard/${userId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <section
      className="relative text-black py-10 overflow-hidden bg-black bg-cover bg-center"
      style={{
        height: "100vh",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/poster11.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bbgg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container mx-auto px-3 flex flex-col md:flex-row items-center justify-center md:mt-0 mt-[5%] md:justify-end relative z-10 h-full">
        <div className="w-full md:w-auto mb-6 md:mb-0 flex flex-col justify-center md:items-start items-center md:pr-8 lg:pr-0 lg:pl-8 text-left">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-titillium font-bold leading-tight mb-4"
            variants={sentence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {text.split("").map((char, index) => {
              // Apply purple color starting from the index where "instacruit" starts
              const isPurple = index >= text.indexOf("instacruit");

              return (
                <motion.span
                  key={index}
                  className={`${isPurple ? "text-[#830e70]" : "text-white"} md:text-[2.6rem] text-[1.8rem] lg:text-[3rem] `}
                  variants={letter}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            className="w-full md:text-start text-center text-sm sm:text-base md:text-lg lg:text-xl font-mingzat mb-6 text-white leading-normal md:leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            InstaCruit: Sikre deg kvalifiserte kandidater med <br />
            InstaCruiter - ditt pålitelige verktøy for rekruttering!
          </motion.p>

          <div className="flex flex-row justify-start space-x-4 mt-1">
            <motion.a
              href="/request_page"
              className="bg-[#830e70] hover:bg-[#bd99bd] text-white font-bold py-3 px-6 md:px-10 rounded-xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              Registrer Interesse
            </motion.a>
            <motion.button
              onClick={handleDashboardClick}
              className="bg-white text-center hover:bg-[#bd99bd] text-[#830e70] font-bold py-3 px-6 rounded-xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              Logg inn
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
