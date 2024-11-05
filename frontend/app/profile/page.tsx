import React from "react";
import Profile from "../pages/profile";
import Navbar from "../Components/bar";

function Page() {
  return (
    <div>
      <Navbar companyName={"N/A"} />
      <Profile />
    </div>
  );
}

export default Page;
