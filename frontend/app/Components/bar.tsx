"use client";
import { FaCog } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/images/logo.png"

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
    <nav className="bg-black text-white py-4 px-4 md:px-8 flex justify-between gap-2 items-center">
      <div className="flex items-center">
        <div className="flex items-center">
          <Image src={Logo} alt="Instacruit" loading="lazy" className=" object-cover h-auto" />
        </div>

        <div className=" md:block hidden ml-10">
          <span className="text-white font-semibold mr-6 cursor-pointer">
            Leads
          </span>
          <div className="border-b-2 border-[#830e70] w-10 mt-2"></div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center text-white ">
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
          <FaCog className="text-[#830e70] md:block hidden cursor-pointer" size={24} />
          <HiChevronDown className="text-[#830e70] md:block hidden cursor-pointer" size={24} />
        </div>
      </div>
    </nav>
  );
}
