"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from '../../public/images/logo.png'
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('')
  const router = useRouter();
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#222121] py-2 text-white fixed top-0  w-full z-[10000000000] shadow-md">
  <div className="max-w-[1400px] mx-auto flex justify-between items-center h-[60px] md:h-[70px] px-4">
    {/* Logo */}
    <Link href={'/'} className="text-2xl font-bold ">
      <Image src={Logo} alt="Instacruit"  className=" object-cover w-20 md:w-full " />
    </Link>

    {/* Mobile Menu Icon */}
    <div className="md:hidden block text-xl " onClick={toggleMenu}>
      {isOpen ? (
        <FaTimes className="" />
      ) : (
        <FaBars className="" />
      )}
    </div>

    {/* Menu Items */}
    <ul
      className={`  px-5 py-8 transform ${
        isOpen ? "translate-x-0 fixed left-0 top-[70px] bg-[#222121] w-full flex flex-col gap-5 " : "hidden"
      }  md:flex md:flex-row md:items-center md:space-x-12  transition-all duration-300 ease-in-out z-50`}
    >
      <li className="my-4 md:my-0">
        <Link href="/Om_Oss" className="block text-lg hover:text-[#830e70] transition-all duration-300 ease-in-out whitespace-nowrap">
          Om Oss
        </Link>
      </li>
      <li className="my-4 md:my-0">
        <Link href="/tjenester" className="block text-lg hover:text-[#830e70] transition-all duration-300 ease-in-out whitespace-nowrap">
          Tjenester
        </Link>
      </li>
      <li className="my-4 md:my-0">
        <Link href="/Kontakt_oss" className="block text-lg hover:text-[#830e70] transition-all duration-300 ease-in-out whitespace-nowrap">
          Kontakt Oss
        </Link>
      </li>
      <li className={` ${isAuthenticated ? "" : "hidden"} my-4 md:my-0`}>
        <button onClick={handleDashboardClick} className="block text-lg hover:bg-[#830e70]/90 bg-[#830e70] px-5 py-2 rounded-md shadow-inner transition-all duration-300 ease-in-out whitespace-nowrap">
        Kontrollpanel
        </button>
      </li>
    </ul>
  </div>
</nav>

  );
};

export default Navbar;
