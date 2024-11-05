import React from "react";
import CandidateForm from "../../../pages/candidateDetails";

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// type ExampleData = {
//   id: number;
//   companyName: string;
// };

const Page = async ({ params }) => {

  const {id} = params

  console.log("hello", id);

  let data = null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company-details/${id}`, {
      next: { revalidate: 10 },
    });
    const fetchdata = await response.json();

    if(response.ok){
      data = fetchdata?.data
      console.log("Company details fetched successfully");
    }
    else{
      console.log("company details fetch failed");
    }

    console.log("company-details", data)
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
  

  return (
    <div>
      <CandidateForm companyName = {data?.companyName} />
    </div>
  );
}

export default Page;
