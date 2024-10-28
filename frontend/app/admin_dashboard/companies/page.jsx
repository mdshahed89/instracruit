import React from "react";
import { CiEdit } from "react-icons/ci";
import CompanyDeleteModal from "../../Components/CompanyDeleteModal";
import Link from "next/link";
import { BsJournalText } from "react-icons/bs";
import { MdEventAvailable, MdOutlineArrowBackIos } from "react-icons/md";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import CompanyTable from "../../Components/CompanyTable"


const page = async () => {

  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;

  // console.log(`token : ${token}`);

  
  

  const adminData = jwt.decode(token);
  console.log(adminData);
  

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/details`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  let data;
  const fetchedData = await response.json();
  if (response.ok) {
    data = fetchedData.data;
    console.log("data fetched successfully:");
  } else {
    console.error("Error fetching data:", fetchedData);
  }

  //   console.log(data);

  return (
    <div className=" bg-[#830e70]/20 min-h-[100vh]  ">
      <div className="  w-full flex bg-[#830e70] items-center py-5 px-5 justify-between ">
      <h2 className=" text-[2rem]  ">Bedrifter</h2>
      <Link href={`/admin_dashboard/${adminData?.id}`} className="bg-[#fff] p-2 rounded-full">
            <MdOutlineArrowBackIos className="text-[#830e70] text-[1.2rem]" />
          </Link>
      </div>


      <CompanyTable data={data} />


    </div>
  );
};

export default page;
