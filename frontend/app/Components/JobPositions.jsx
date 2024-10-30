"use client";
import React, { useEffect } from "react";
import JobPosition from "./JobPosition";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const JobPositions = ({ data, id }) => {

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
    <div className=" flex items-center justify-center min-h-[100vh] py-10 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
        className=" max-w-[800px] w-full mx-auto bg-[#830e70] lg:px-12 md:px-6 px-4 md:py-10 py-6 rounded-2xl "
      >
        <div className=" mt-5 flex items-center justify-between ">
          <h2 className=" text-[2rem]  ">
            Tilgjengelig stilling({data?.length})
          </h2>
          <Link
            href={`/admin_dashboard/${id}/companies`}
            className="bg-[#fff] p-2 rounded-full"
          >
            <MdOutlineArrowBackIos className="text-[#830e70] text-[1.2rem]" />
          </Link>
        </div>

        <div className=" flex flex-col gap-3 mt-14 ">
          {data.map((dt, idx) => (
            <div key={idx}>
              <JobPosition data={dt} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default JobPositions;
