import React from 'react'
import CompanyEdit from '../../../Components/CompanyEdit'

const page = async ({params}) => {

  const { id } = params;
let companyData;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companydetails`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyId: id }),
      cache: 'no-store'
    }
  );
  const fetchedData = await response.json();
  console.log(fetchedData);

  if (fetchedData.success) {
    companyData = fetchedData.data
    console.log("data fetched successfully:");
    // setDataLoading(false)
  } else {
    console.error("Error fetching data:", fetchedData);
    // setDataLoading(false)
  }

  // console.log("companydata",companyData);
  

  return (
    <div className=' px-3 '>
      <CompanyEdit id={id} companyData={companyData} />
    </div>
  )
}

export default page