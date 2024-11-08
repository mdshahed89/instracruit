import Image from "next/image";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ComapnyIcon from '../../public/icons/CompanyIcon.png'

export default function Footer() {
  return (
    <footer className="bg-[#222121] px-5 text-white py-8">
      <div className="max-w-[1250px] w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-32 items-center">
        {/* Contact Section */}
        <div className="flex flex-col space-y-4 items-center md:items-start md:col-span-2">
          <Link href="/">
            <Image
              src={ComapnyIcon}
              alt="Instacruit"
              width={80}
              height={80}
              className="h-20 w-20 mb-4 mx-auto md:mx-0"
              loading="lazy"
            />
          </Link>
          <Link href="Kontakt_oss">
            <span className="font-bold text-xl">Kontakt</span>
          </Link>
          <ul className="space-y-2 mt-2 text-lg text-center md:text-left">
            <li>Org.nr: 94099566</li>
            <li>Ole Deviks vei 4, 0666 Oslo</li>
            <Link href="mailto:kontakt@instacruit.no">
              <li>kontakt@instacruit.no</li>
            </Link>
            <li>
              Copyright © 2024 Alle rettigheter reservert -{" "}
              <Link
                href="https://sidesone.no/"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-gray-400"
              >
                <span className="text-green-400">
                  Nettside drevet av sidesone
                </span>
              </Link>
            </li>
          </ul>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            <Link
              href="https://www.facebook.com/Instacallas"
              target="_blank"
              aria-label="Facebook"
              className=" hover:bg-[#830e70]/70 transition-colors duration-300 ease-in-out  bg-[#830e70] p-2 rounded-full  "
            >
              <FaFacebookF size={24} />
            </Link>
            <Link
              href="https://www.instagram.com/instacalloslo/"
              target="_blank"
              aria-label="Instagram"
              className=" hover:bg-[#830e70]/70 transition-colors duration-300 ease-in-out  bg-[#830e70] p-2 rounded-full "
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://no.linkedin.com/company/instacalltm"
              target="_blank"
              aria-label="Instagram"
              className=" hover:bg-[#830e70]/70 transition-colors duration-300 ease-in-out  bg-[#830e70] p-2 rounded-full "
            >
              <FaLinkedinIn size={24} />
            </Link>
          </div>
        </div>

        {/* Right Section: Menu & User */}
        <div className="flex flex-row gap-16 md:flex-col md:col-span-1 items-start justify-center ">
          {/* Menu Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-xl">Meny</h3>
            <ul className="space-y-2 mt-2 text-lg text-center md:text-left">
              <li>
                <Link href="/Om_Oss" className="hover:underline">
                Hvem vi er
                </Link>
              </li>
              <li>
                <Link href="/Kontakt_oss" className="hover:underline">
                Nå oss
                </Link>
              </li>
              <li>
                <Link href="/tjenester" className="hover:underline">
                Hva vi tilbyr
                </Link>
              </li>
            </ul>
          </div>

          {/* User Section */}
          <div className="flex flex-col items-start">
            <h3 className="font-bold text-xl">Bruker</h3>
            <ul className="space-y-2 mt-2 text-lg text-center md:text-left">
              <li>
                <Link href="/login" className="hover:underline">
                Tilgang
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
