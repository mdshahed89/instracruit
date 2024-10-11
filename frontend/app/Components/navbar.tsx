"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#222121] text-white fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="text-2xl font-bold">
          <img src="/logo.png" alt="InstaCruit Logo" className="h-12 md:h-16" />
        </div>

        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </div>

        <ul
          className={`fixed top-0 left-0 h-full px-5 w-64 bg-[#222121] transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:flex md:flex-row md:items-center md:space-x-16 md:ml-auto md:pr-12 transition-transform duration-300 ease-in-out z-50`}
        >
          <li className="my-4 md:my-0">
            <a
              href="/Om_Oss"
              className="block text-lg hover:text-[#830e70] whitespace-nowrap"
            >
              Om Oss
            </a>
          </li>
          <li className="my-4 md:my-0">
            <a
              href="/tjenester"
              className="block text-lg hover:text-[#830e70] whitespace-nowrap"
            >
              Tjenester
            </a>
          </li>
          <li className="my-4 md:my-0">
            <a
              href="/Kontakt_oss"
              className="block text-lg hover:text-[#830e70] whitespace-nowrap"
            >
              Kontakt Oss
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
