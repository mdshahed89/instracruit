"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#222121] text-white fixed top-0  w-full z-[10000000000] shadow-md">
  <div className="max-w-[1400px] mx-auto flex justify-between items-center h-[80px] px-4">
    {/* Logo */}
    <Link href={'/'} className="text-2xl font-bold">
      <img src="/logo.png" alt="InstaCruit Logo" className="h-12 md:h-16" />
    </Link>

    {/* Mobile Menu Icon */}
    <div className="md:hidden" onClick={toggleMenu}>
      {isOpen ? (
        <FaTimes className="w-6 h-6" />
      ) : (
        <FaBars className="w-6 h-6" />
      )}
    </div>

    {/* Menu Items */}
    <ul
      className={`  px-5 py-8 transform ${
        isOpen ? "translate-x-0 fixed left-0 top-[110px] bg-[#222121] w-full flex flex-col gap-5 " : "hidden"
      }  md:flex md:flex-row md:items-center md:space-x-16  transition-transform duration-300 ease-in-out z-50`}
    >
      <li className="my-4 md:my-0">
        <a href="/Om_Oss" className="block text-lg hover:text-[#830e70] whitespace-nowrap">
          Om Oss
        </a>
      </li>
      <li className="my-4 md:my-0">
        <a href="/tjenester" className="block text-lg hover:text-[#830e70] whitespace-nowrap">
          Tjenester
        </a>
      </li>
      <li className="my-4 md:my-0">
        <a href="/Kontakt_oss" className="block text-lg hover:text-[#830e70] whitespace-nowrap">
          Kontakt Oss
        </a>
      </li>
    </ul>
  </div>
</nav>

  );
};

export default Navbar;
