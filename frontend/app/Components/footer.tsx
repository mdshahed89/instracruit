import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#222121] px-5 text-white py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-32 items-center">
        {/* Contact Section */}
        <div className="flex flex-col space-y-4 items-center md:items-start md:col-span-2">
          <a href="/">
            <img
              src="https___9c2322e2a82d25ea1ce487b6d7489f25.cdn.bubble.io_f1724417740048x801364741370541300_b1f0f62f-d527-4869-baf5-f3eb38684829-removebg-preview.png"
              alt="Logo"
              className="h-20 w-20 mb-4 mx-auto md:mx-0"
            />
          </a>
          <a href="Kontakt_oss">
            <h3 className="font-bold text-xl">Kontakt</h3>
          </a>
          <ul className="space-y-2 mt-2 text-lg text-center md:text-left">
            <li>Org.nr: 94099566</li>
            <li>Ole Deviks vei 4, 0666 Oslo</li>
            <a href="mailto:kontakt@instacruit.no">
              <li>kontakt@instacruit.no</li>
            </a>
            <li>
              Copyright © 2024 Alle rettigheter reservert -{" "}
              <a
                href="https://sidesone.no/"
                aria-label="Facebook"
                className="hover:text-gray-400"
              >
                <span className="text-green-400">
                  Nettside drevet av sidesone
                </span>
              </a>
            </li>
          </ul>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            <a
              href="https://www.facebook.com/Instacallas"
              aria-label="Facebook"
              className="hover:text-gray-400"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/instacalloslo?igsh=czc5dThtNTZmZmU1"
              aria-label="Instagram"
              className="hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Right Section: Menu & User */}
        <div className="flex flex-col md:col-span-1 items-center md:items-start justify-center space-y-8">
          {/* Menu Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-xl">Meny</h3>
            <ul className="space-y-2 mt-2 text-lg text-center md:text-left">
              <li>
                <a href="/Om_oss" className="hover:underline">
                  Om oss
                </a>
              </li>
              <li>
                <a href="/Kontakt_oss" className="hover:underline">
                  Kontakt oss
                </a>
              </li>
              <li>
                <a href="/tjenester" className="hover:underline">
                  Tjenester
                </a>
              </li>
            </ul>
          </div>

          {/* User Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-xl">Bruker</h3>
            <ul className="space-y-2 mt-2 text-lg text-center md:text-left">
              <li>
                <a href="/login" className="hover:underline">
                  Logg inn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
