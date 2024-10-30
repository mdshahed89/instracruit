'use client'
import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import CompanyDeleteModal from '../Components/CompanyDeleteModal'
import { BsJournalText } from 'react-icons/bs';
import { MdEventAvailable } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const CompanyTable = ({data, id}) => {

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
    <div className=" px-3 lg:px-5 overflow-x-auto ">
      <motion.table initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.1, duration: 0.5 }} className="table-auto overflow-hidden  w-full shadow-md rounded-lg bg-[#830e70]/80 mx-auto font-Montserrat my-6">
        <thead className="bg-[#830e70]/80 rounded-t-lg">
          <tr className="rounded-lg text-white">
            <th className="py-3 px-6 text-left">Firmanavn</th>
            <th className="py-3 px-6 text-center">Kandidat</th>
            <th className="py-3 px-6 text-center">Firma-e-poster</th>
            <th className="py-3 px-6 text-center">Aktive administratorer</th>
            <th className="py-3 px-6 text-center">Bransje</th>
            <th className="py-3 px-6 text-end">Handlinger</th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((dt, ind) => (
            <tr
              key={ind}
              className="hover:bg-[#55194b] border-t border-[#922680] transition duration-300 min-h-full"
              
            >
              <td className="py-4 px-6">{dt?.name ? dt?.name : "N/A"}</td>
              <td className="py-4 px-6 text-center">
                {dt?.candidateNo ? dt?.candidateNo : "N/A"}
              </td>
              <td className="py-4 px-6 text-center flex flex-col">
                {dt?.userEmails.map((email, idx) => (
                  <span key={idx}>{email}</span>
                ))}
              </td>
              <td className="py-4 px-6 text-center">
                {dt?.activeAdmin ? dt?.activeAdmin : "0"}
              </td>
              <td className="py-4 px-6 text-center">
                {dt?.industry ? dt?.industry : "N/A"}
              </td>
              <td>
                <div className="py-4 px-6 text-end flex items-center h-full justify-end gap-5 text-[1.5rem] transition-colors duration-300 ease-in-out">
                  <CompanyDeleteModal companyId={dt?.companyId} />
                  <Link href={`companies/${dt?.companyId}/create-job-position`}>
                    <BsJournalText className="text-[1.3rem] hover:text-[#830e70] transition-colors duration-300 ease-in-out cursor-pointer" />
                  </Link>
                  <Link href={`companies/${dt?.companyId}/job-positions`}>
                    <MdEventAvailable className="text-[1.4rem] hover:text-[#830e70] transition-colors duration-300 ease-in-out cursor-pointer" />
                  </Link>
                  <Link href={`/admin_dashboard/${id}/companies/${dt?.companyId}`}>
                    <CiEdit className="cursor-pointer hover:text-[#830e70] transition-colors duration-300 ease-in-out" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  )
}

export default CompanyTable