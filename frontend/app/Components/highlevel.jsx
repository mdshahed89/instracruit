import React, { useState } from "react";
import ProtectedDashboard from "./ProtectedDashboard"; // Adjust import path as needed
import MoveLeadModal from "./MoveLeadModal"; // Adjust import path as needed

const DashboardContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState < boolean > false;
  const [columns, setColumns] =
    useState <
    Columns >
    {
      "ikke-kvalifisert": { name: "Ikke kvalifisert", items: [] },
      "nye-søkere": { name: "Nye søkere", items: [] },
      utdannet: { name: "Utdannet", items: [] },
      intervju: { name: "Intervju", items: [] },
      slippav: { name: "Slipp av", items: [] },
      tilby: { name: "Tilby", items: [] },
      ansatt: { name: "Ansatt", items: [] },
    };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
     
      <ProtectedDashboard columns={columns} toggleModal={toggleModal} />

      <MoveLeadModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        columns={columns}
      />
    </div>
  );
};

export default DashboardContainer;
