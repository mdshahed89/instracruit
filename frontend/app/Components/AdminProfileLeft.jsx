"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AdminProfileLeft = ({id}) => {
  const [currentPath, setCurrentPath] = useState('');


  useEffect(() => {
    const updatePath = () => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    };

    // Set initial path
    updatePath();

    // Polling interval to check for path changes
    const intervalId = setInterval(updatePath, 500);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
}, []);
    
    
  
  
    

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 1 }}
      className=" w-[40%] border-r  border-[#830e70] h-[780px]  px-2 py-10 text-[1.2rem] flex flex-col gap-2  "
    >
      <Link
         href={`/admin_dashboard/${id}/profile`}
        className={` ${currentPath === `/admin_dashboard/${id}/profile` ? "bg-[#830e70]" : "bg-[#830e70]/70"} py-2 hover:bg-[#830e70]  px-2 rounded-md transition-colors duration-300 ease-in-out `}
      >
        Edit Profile
      </Link>
      <Link  href={`/admin_dashboard/${id}/profile/account-setting`} className={` ${currentPath === `/admin_dashboard/${id}/profile/account-setting` ? "bg-[#830e70]" : "bg-[#830e70]/70"} py-2 hover:bg-[#830e70] px-2 rounded-md transition-colors duration-300 ease-in-out `}>
        Account Setting
      </Link>
    </motion.div>
  );
};

export default AdminProfileLeft;
