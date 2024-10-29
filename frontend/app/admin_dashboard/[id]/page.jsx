import React from 'react'
import { PiUsersThreeLight } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { LuFileEdit } from 'react-icons/lu';
import { BiUserPlus } from 'react-icons/bi';
import Image from 'next/image';
import { RiUserSettingsLine } from 'react-icons/ri';
import Link from 'next/link';
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";
import {InviteAdminModal} from '../../Components/InviteAdminModal'
import { redirect } from 'next/navigation';
import AdminDashboard from '../../Components/AdminDashboard'


const page = async ({params}) => {

  const cookieStore = await cookies();
  const token = await cookieStore.get("authToken")?.value;

  // console.log(`token : ${token}`);

  const {id} = await params
  console.log("idid");
  
  console.log(id)
  

  const data =  jwt.decode(token);

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
    cache: 'no-store'
  });
let userData;
  if (response.ok) {
    userData = await response.json();
    console.log('data fetched successfully:');
  } else {
    const errorData = await response.json();
    console.error('Error fetching data:', errorData);
    redirect("/admin_login")
  }
  userData = userData?.user


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/details`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  let companies;
  const fetchedData = await res.json();
  if (response.ok) {
    companies = fetchedData.data;
    console.log("data fetched successfully:");
  } else {
    console.error("Error fetching data:", fetchedData);
  }

  // console.log(userData);
  

  return (
    <AdminDashboard userData ={userData} companies = {companies} />
  )
}

export default page