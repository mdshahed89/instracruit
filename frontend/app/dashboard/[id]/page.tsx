"use client"; // Ensure this is a client component if needed

import { useParams } from "next/navigation";
import CombinedDashboard from "../../Components/Sidebar";
function Page() {
  const { id } = useParams();
  return (
    <div>
      <CombinedDashboard />
    </div>
  );
}

export default Page;
