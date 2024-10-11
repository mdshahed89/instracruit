"use client";
import { FaCog } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout successful!");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };
  return (
    <nav className="bg-black text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="InstaCruit Logo" className="h-12 md:h-16" />
        </div>

        <div className="ml-10">
          <span className="text-white font-semibold mr-6 cursor-pointer">
            Leads
          </span>
          <div className="border-b-2 border-[#830e70] w-10 mt-2"></div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <select
            className="bg-transparent text-white border border-gray-300 p-2 rounded-md"
            name="organization"
            id="organization"
          >
            <option value="org1">Velg organisasjon</option>
            <option className="text-black" value="org2" onClick={handleLogout}>
              logg ut
            </option>
          </select>
          <FaCog className="text-[#830e70] cursor-pointer" size={24} />
          <HiChevronDown className="text-[#830e70] cursor-pointer" size={24} />
        </div>
      </div>
    </nav>
  );
}
