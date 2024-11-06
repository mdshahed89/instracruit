"use client";
import { FaCog } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/logo.png"

interface CandidateNavProps {
  companyName: string | null | undefined;
}

export default function Navbar({companyName}:CandidateNavProps) {
  const router = useRouter();

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   toast.success("Logout successful!");
  //   setTimeout(() => {
  //     router.push("/login");
  //   }, 1000);
  // };
  return (
    <nav className="bg-black text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex items-center">
          <Image src={Logo} alt="Instacruit" className="h-12 md:h-16" />
        </div>

        <div className="ml-10">
          <span className="text-white font-semibold mr-6 cursor-pointer">
            Leads
          </span>
          <div className="border-b-2 border-[#830e70] w-10 mt-2"></div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center text-white space-x-2">
          <select
            className="bg-[#830e70] text-white border border-gray-300 px-4 py-2 outline-none rounded-md"
            name="organization"
            id="organization"
          >
            <option value="org1">Velg organisasjon</option>
            <option className="" value="org2" >
              {companyName}
            </option>
          </select>
          <FaCog className="text-[#830e70] cursor-pointer" size={24} />
          <HiChevronDown className="text-[#830e70] cursor-pointer" size={24} />
        </div>
      </div>
    </nav>
  );
}
