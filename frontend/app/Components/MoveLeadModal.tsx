import React from "react";

interface MoveLeadModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  columns: { [key: string]: { name: string } };
}

const MoveLeadModal: React.FC<MoveLeadModalProps> = ({
  isOpen,
  toggleModal,
  columns,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            onClick={toggleModal}
          >
            &times;
          </button>

          <h2 className="text-xl font-bold text-[#830e70] mb-4">Move lead</h2>
          <p className="text-gray-500 mb-4">Select Location</p>

          <select className="w-full border border-gray-300 text-black rounded p-2 mb-4">
            <option>Select Location</option>
            {columns &&
              Object.keys(columns).map((columnId) => (
                <option key={columnId} value={columnId}>
                  {columns[columnId].name}
                </option>
              ))}
          </select>

          <button className="bg-[#830e70] text-white px-4 py-2 rounded w-full hover:bg-[#6e0b5a]">
            Move
          </button>
        </div>
      </div>
    )
  );
};

export default MoveLeadModal;
