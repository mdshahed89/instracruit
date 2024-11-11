"use client"
import React, { useEffect, useState } from 'react'
import AdminUserIcon from "../Components/AdminUserIcon";
import { motion } from "framer-motion";
import Logo from "../../public/images/logo.png";
import Image from 'next/image';


const AdminProfileNav = ({userData}) => {


  return (
    <div className=" bg-[#222121] py-4 ">
        <motion.div
        key={'admin-profile-nav'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className=" max-w-[1300px] mx-auto flex items-center justify-between px-3 "
        >
            
          <Image
            src={Logo}
            alt="Logo"
            width={96}
            height={96}
            className="w-[6rem] object-cover"
          />
         

           {userData && <AdminUserIcon id={userData?._id} profile={true} />}
        </motion.div>
      </div>
  )
}

export default AdminProfileNav