"use client"; 

import { useParams } from "next/navigation";
import CombinedDashboard from "../../Components/Sidebar";
function Page() {
  const { id } = useParams();
  console.log(id);
  
  return (
    <div>
      <CombinedDashboard />
    </div>
  );
}

export default Page;
