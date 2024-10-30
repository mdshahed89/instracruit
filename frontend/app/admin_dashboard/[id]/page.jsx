import React from 'react'
import { redirect } from 'next/navigation';
import AdminDashboard from '../../Components/AdminDashboard'


const page = async ({params}) => {

  // const cookieStore = cookies();
  // const token = cookieStore.get("authToken")?.value;

  // console.log(`token : ${token}`);

  const {id} = params
  console.log("idid");
  
  console.log(id)

  if(!id) {
    redirect("/admin_login");
    return;
  }
  

  // const data =  jwt.decode(token);

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  let userData;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
    credentials: "include",
    cache: 'no-store'
  });

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
      credentials: "include",
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
    <AdminDashboard userData ={userData} companies = {companies} id={id} />
  )
}

export default page