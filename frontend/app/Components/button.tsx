"use client";
import React, { useState } from "react";
import MoveLeadModal from "./MoveLeadModal";
import { FaArrowLeft } from "react-icons/fa";

export default function DropDowncomp({
  columns,
}: {
  columns: { [key: string]: { name: string } };
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        className="absolute top-4 right-4 bg-white text-[#830e70] px-4 py-2 rounded hover:bg-[#830e70] hover:text-white shadow-md"
        onClick={toggleModal}
      >
        Flytt lead
      </button>

      <MoveLeadModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        columns={columns}
      />
    </div>
  );
}
