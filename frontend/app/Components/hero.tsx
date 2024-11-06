"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import BackgroundEffect from '../Components/BackgroundEffect'

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
  const text = "Velkommen til Instacruit";
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
      className="relative h-full text-white  overflow-hidden bg-cover bg-center"
      // style={{
      //   height: "100vh"
      // }}
    >
      {/* <HeroVideo /> */}
     <div className="  ">
      {/* hello */}
      <BackgroundEffect />
      <div className=" absolute z-50 top-0 w-full h-full left-0  ">
        <div className=" max-w-[1450px] w-full px-3  h-full mx-auto flex flex-col items-start justify-center  text-left ">
          <motion.h1
            className="  font-bold  mb-4"
            variants={sentence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {text.split("").map((char, index) => {
              // Apply purple color starting from the index where "instacruit" starts
              const isPurple = index >= text.indexOf("Instacruit");

              return (
                <motion.span
                  key={index}
                  className={`${isPurple ? "text-[#830e70]" : "text-white"} md:text-[3rem] text-[1.6rem] sm:text-[2rem] leading-tight lg:text-[4rem] `}
                  variants={letter}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            className="w-full mb-10 md:text-[1.3rem] text-sm sm:text-[1rem] lg:text-[1.4rem] text-[#f3f3f3] max-w-[20rem] sm:max-w-[30rem] leading-8 md:max-w-[52rem] "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
           Instacruit: Sikre deg de beste, kvalifiserte kandidatene med Instacruiter - ditt pålitelige, effektive verktøy for rask og enkel rekruttering. Oppdag hvordan vi kan hjelpe deg å finne topptalenter og lykkes med ansettelsen
          </motion.p>

          <div className="flex justify-end gap-3 md:text-[1.2rem] text-[1rem] lg:text-[1.4rem] ">
            <motion.a
              href="/request_page"
              className="bg-[#830e70] hover:bg-[#bd99bd] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 md:px-10 rounded-md transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              Registrer Interesse
            </motion.a>
            <motion.button
              onClick={handleDashboardClick}
              className="bg-white text-center cursor-pointer hover:bg-[#bd99bd] text-[#830e70] font-semibold py-2 sm:py-3 px-4 sm:px-6 md:px-10 rounded-md transition duration-300"
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
     </div>
    </section>
  );
};

export default Hero;
