import Link from "next/link";
import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import JobPosition from "../../../../Components/JobPosition"
import JobPositions from "../../../../Components/JobPositions"

const page = async ({ params }) => {
  const { id } = params;

  console.log(id);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/company/${id}/job-positions`,
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
    console.log("data fetched successfully of jobs");
  } else {
    console.error("Error fetching data:", fetchedData);
  }

//   console.log("job data",data);

  return (
    <JobPositions data={data} />
  );
};

export default page;
