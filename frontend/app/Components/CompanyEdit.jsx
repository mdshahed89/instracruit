"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import CandidateDeleteModal from '../Components/CandidateDeleteModal';
import { motion } from "framer-motion";

const CompanyEdit = ({ cid, id, companyData }) => {
    console.log(companyData);
    
  const [companyDetails, setCompanyDetails] = useState({
    name: companyData?.name ? companyData?.name : "",  // Ensure initial state matches server-rendered HTML
    industry: companyData?.industry || "",
  });
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false)

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCompanyDetails = async (e) => {
    e.preventDefault();
    setLoading1(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/edit/${cid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyDetails),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Details updated successfully");
      } else {
        toast.error("Updating details failed");
      }
      setLoading1(false);
    } catch (error) {
      toast.error("Error submitting company details");
      setLoading1(false);
    }
  };

  const [emails, setEmails] = useState(companyData?.userEmails)
  
  const handleEmailChange = (index, newEmail) => {
      const updatedEmails = [...emails]; // Create a copy of the emails array
      updatedEmails[index] = newEmail; // Update the specific email
      setEmails(updatedEmails); // Update the state with the new array
    };
    console.log(emails);

    const handleSubmitCompanyEmails = async (e) => {
        e.preventDefault();
        setLoading2(true);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/edit-company-emails/${cid}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({emails}),
          });
          const data = await res.json();
          if (data.success) {
            toast.success("Company Emails updated successfully");
          } else {
            toast.error(data.message);
          }
          setLoading2(false);
        } catch (error) {
          toast.error("Error submitting company Emails");
          console.log(error);
          
          setLoading2(false);
        }
      };
  
  return (
    <motion.div initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay:  0.2, duration: 1 }} className="max-w-[800px] my-[5%] mx-auto lg:px-12 md:px-7 font-Montserrat px-4 md:py-12 py-6 shadow-[0px_0px_20px_0px_#830e70] bg-[#000] text-white rounded-lg ">
      {/* Company Details Form */}
      <form onSubmit={handleSubmitCompanyDetails} className="mb-10 flex flex-col gap-3">
        <div className="flex items-center mb-7 justify-between">
          <h2 className="text-[1.5rem] uppercase font-semibold mb-2">Bedriftsdetaljer</h2>
          <Link href={`/admin_dashboard/${id}/companies`} className="bg-[#fff] p-2 rounded-full">
            <MdOutlineArrowBackIos className="text-[#830e70] text-[1.2rem]" />
          </Link>
        </div>
        <div className=" ">
        <label className="block mb-2">
        Firmanavn
          </label>
          <input
            type="text"
            name="name"
            defaultValue={companyDetails?.name ? companyDetails?.name : "N/A"}  // Controlled input
            onChange={handleCompanyChange}
            required
            className=" block w-full rounded-full bg-transparent outline-none border-[#830e70] border px-4 py-2"
          />
        </div>
        <div>
        <label className="block mb-2">
          Bransje
          </label>
          <input
            type="text"
            name="industry"
            defaultValue={companyDetails.industry ? companyDetails?.industry : "N/A"}  // Controlled input
            onChange={handleCompanyChange}
            required
            className=" block w-full border rounded-full outline-none bg-transparent border-[#830e70] px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-[#830e70] text-white py-3 rounded-full hover:bg-[#830e70] transition"
        >
          {loading1 ? "Laster..." : "Send inn bedriftsdetaljer"}
        </button>
      </form>

      {/* Candidate Form */}
      <h2 className="text-lg font-semibold mb-2">Kandidater</h2>
      <div className="overflow-x-auto mb-6">
        {companyData?.candidates?.length > 0 ? (
          <table className="min-w-full  border rounded-lg bg-[#830e70]  overflow-hidden border-[#830e70]">
            <thead className=" rounded-t-lg  ">
              <tr className=" text-white text-left">
                <th className="py-3 px-6 text-sm font-medium">Kandidats navn</th>
                <th className="py-3 px-6 text-sm text-center font-medium">E-post</th>
                <th className="py-3 px-6 text-sm font-medium text-end">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {companyData.candidates.map((candidate, index) => (
                <tr key={index} className="border-t bg-black border-[#830e70]">
                  <td className="py-4 px-6">{candidate?.customerInfo?.fulltNavn}</td>
                  <td className="py-4 text-center px-6">{candidate?.customerInfo?.epost}</td>
                  <td className="py-4 px-6 text-end">
                    <div className="flex items-center justify-end space-x-3">
                      {/* <button className="text-red-600 hover:text-red-800"> */}
                        <CandidateDeleteModal companyId={cid} candidateEmail = {candidate?.customerInfo?.epost} />
                      {/* </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "Kandidat ikke funnet"
        )}
      </div>

      {/* Company Email Form */}
      <form onSubmit={handleSubmitCompanyEmails}>
        <h2 className="text-lg font-semibold mb-2">Firma-e-post</h2>
        <label className="block mt-5 mb-2">
          {companyData?.userEmails?.length > 1 ? "Emails" : "Email"}
          </label>
          <div className=" flex flex-col gap-2 ">
          {companyData?.userEmails?.map((email, idx) => (
            <input
              key={idx}
              type="email"
              defaultValue={email}
              onChange={(e) => handleEmailChange(idx, e.target.value)}
              required
              className=" block w-full border outline-none bg-transparent border-[#830e70] rounded-full px-4 py-2"
            />
          ))}
          </div>
        
        <button
          type="submit"
          className=" mt-7 w-full bg-[#830e70] text-white py-3 rounded-full hover:bg-[#830e70] transition"
        >
          {
            loading2 ? "Laster..." : "Send inn"
          }
        </button>
      </form>
    </motion.div>
  );
};

export default CompanyEdit;
