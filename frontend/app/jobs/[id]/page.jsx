import React from 'react'
import CreateJob from '../../Components/CreateJob'

const page = async ({params}) => {

    const { id } = params;
   

  console.log(id);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/jobs/${id}`,
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
    console.log("data fetched successfully of job");
  } else {
    console.error("Error fetching data:", fetchedData)
  }

  console.log("job data",data);

  return (
    <div>
        <CreateJob data = {data} />
    </div>
  )
}

export default page