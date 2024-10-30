"use client";
import React, { useEffect } from "react";
import AdminUserIcon from "../Components/AdminUserIcon";
import { PiUsersThreeLight } from "react-icons/pi";
import Link from "next/link";
import { LuFileEdit } from "react-icons/lu";
import { InviteAdminModal } from "./InviteAdminModal";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import AdminDashboardCompanies from '../Components/AdminDashboardCompanies'
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const AdminDashboard = ({ userData, companies, id }) => {

  const router = useRouter()

useEffect(()=> {
  const token = localStorage.getItem('authToken');
  if(!token){
    router.push("/admin_login")
    return 
  }

  const tokenData = jwtDecode(token);
  console.log(tokenData.id);
  
  if(tokenData?.id !== id){
    router.push("/admin_login")
    return 
  }

}, [])

  return (
    <div className=" font-Montserrat  ">
      <div className=" bg-[#222121] py-4 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className=" max-w-[1000px] mx-auto flex items-center justify-between px-3 "
        >
          <Image
            src={Logo}
            alt="Logo"
            loading="lazy"
            className=" w-[6rem] object-cover "
          />

          <AdminUserIcon id={userData?._id} profile={false} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className=" max-w-[1000px] mx-auto text-[1.8rem] sm:text-[3rem] lg:text-[4rem] leading-tight py-[10%] md:py-[5%] px-3 "
      >
        <h2>
          Hei, <span className=" text-[#830e70] ">{userData?.name}!</span>
        </h2>
        <h2>Velkommen til Adminpanel</h2>
      </motion.div>
      <div className=" bg-[#222121] pb-16 lg:pb-28 ">
        <div className=" max-w-[1000px] mx-auto  px-3 ">
          <h2 className=" text-[1.8rem] sm:text-[3rem] lg:text-[4rem] mb-5 ">
            Dashboard
          </h2>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 ">
            <motion.div  initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}>
              <Link
                href={`/admin_dashboard/${id}/companies`}
                className=" flex flex-col items-center rounded-md bg-[#404040] py-4 cursor-pointer "
              >
                <PiUsersThreeLight className=" text-[5rem] " />
                <h4>Bedrifter</h4>
              </Link>
            </motion.div>
            <motion.div  initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}>
              <Link
                href={`/admin_dashboard/${id}/admin_only`}
                className=" rounded-md flex flex-col items-center bg-[#404040] py-4 cursor-pointer "
              >
                <LuFileEdit className=" text-[5rem]  " />
                <h4>Registrer Bedrift</h4>
              </Link>
            </motion.div>
            <motion.div  initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }} className=" flex flex-col items-center rounded-md bg-[#404040] py-4 cursor-pointer ">
              <InviteAdminModal />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="  bg-[#830e70] pt-6 pb-12 ">
        <div className=" text-center flex flex-col gap-4 ">
          <h2 className=" text-[1.8rem] sm:text-[3rem] lg:text-[4rem] ">
            START ANONNSE
          </h2>
          <div className=" ">
            <AdminDashboardCompanies companies = {companies} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
