import React from "react";
import AdminRegister from "../../../pages/admin";

interface AdminProps {
  params: { id: string };
}

const Admin: React.FC<AdminProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className=" ">
      <AdminRegister id = {id} />
    </div>
  );
};

export default Admin;
