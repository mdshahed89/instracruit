import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BsJournalText } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { motion } from "framer-motion";
import CompanyDeleteModal from '../Components/CompanyDeleteModal'


export default function AdminDashboardCompanies({companies, id}) {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const items = ['React', 'Angular', 'Vue'];
  
//   useEffect(() => {
//     const close = (e) => {
//       if (dropDownRef.current && !dropDownRef.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener('mousedown', close);
//     return () => document.removeEventListener('mousedown', close);
//   }, []);

  return (
    <div ref={dropDownRef} className="  text-white bg-[#830e70]   ">
      <button onClick={() => setOpen((prev) => !prev)} className=" ">
      <div className=" bg-white rounded-full p-5 transition-all duration-300 ease-linear  ">
              {
                open ? <FaMinus className=" text-[2rem] md:text-[3rem] text-[#830e70]  rotate-180 transition-all duration-300 ease-linear " /> : <FaPlus className=" text-[2rem] md:text-[3rem] text-[#830e70] " />
              }
            </div>
      </button>
              


      <div className=  {` ${open ? 'opacity-100 translate-y-0 scale-100 duration-700' : 'opacity-0 scale-90 h-0 overflow-hidden'}  mx-auto max-w-[1250px] w-full overflow-x-auto   `}>
      <motion.table initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.1, duration: 1 }} className=" w-full shadow-md rounded-lg bg-[#830e70]/80  my-6">
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
          {companies.map((company, ind) => (
            <tr
              key={ind}
              className="hover:bg-[#55194b] border-t border-[#922680] transition duration-300"
              
            >
              <td className="py-4 px-6">{company?.name ? company?.name : "N/A"}</td>
              <td className="py-4 px-6 text-center">
                {company?.candidateNo ? company?.candidateNo : "N/A"}
              </td>
              <td className="py-4 px-6 text-center flex flex-col">
                {company?.userEmails.map((email, idx) => (
                  <span key={idx}>{email}</span>
                ))}
              </td>
              <td className="py-4 px-6 text-center">
                {company?.activeAdmin ? company?.activeAdmin : "0"}
              </td>
              <td className="py-4 px-6 text-center">
                {company?.industry ? company?.industry : "N/A"}
              </td>
              <td>
                <div className="py-4 px-6 text-end flex items-center h-full justify-end gap-5 text-[1.5rem] transition-colors duration-300 ease-in-out">
                  {/* <CompanyDeleteModal companyId={company?.companyId} /> */}
                  <Link href={`${id}/companies/${company?.companyId}/create-job-position`}>
                    <BsJournalText className="text-[1.3rem] hover:text-[#830e70] transition-colors duration-300 ease-in-out cursor-pointer" />
                  </Link>
                  {/* <Link href={`companies/${company?.companyId}/job-positions`}>
                    <MdEventAvailable className="text-[1.4rem] hover:text-[#830e70] transition-colors duration-300 ease-in-out cursor-pointer" />
                  </Link>
                  <Link href={`/admin_dashboard/companies/${company?.companyId}`}>
                    <CiEdit className="cursor-pointer hover:text-[#830e70] transition-colors duration-300 ease-in-out" />
                  </Link> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </div>


    </div>
  );
}