import React from "react";

const DragAbleItem = () => {
  return (
    <div>
      <div
        style={{
          zIndex: 9999999999999,
          pointerEvents: "auto",
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("cicking");

          handleCandidateClick(item.id);
        }}
        className="relative bg-white text-black p-2 rounded-lg mb-4 cursor-pointer "
      >
        <div
          className={`bg-white ${
            columnId === "ikke-kvalifisert" ? "p-1" : "p-2"
          } rounded-lg w-full`}
        >
          <div
            className={`flex items-center ${
              columnId === "ikke-kvalifisert" ? "mb-2" : "mb-4"
            }`}
          >
            <div className="bg-teal-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
              {item.name.charAt(0).toUpperCase()}
            </div>

            <span
              className={`text-gray-200 text-md font-semibold ${
                columnId === "ikke-kvalifisert" ? "text-sm" : "text-md"
              }`}
            >
              {item.name}
            </span>
          </div>

          {columnId !== "ikke-kvalifisert" && (
            <>
              <div className="border-l-4 border-gray-900 rounded-lg pl-2 mb-2">
                <ul className="list-none text-gray-500 space-y-1">
                  <li className="flex items-center justify-start">
                    <span
                      onClick={() => {
                        console.log("clicking on ss");
                      }}
                      className="mr-2"
                    >
                      Screening Part 1
                    </span>
                    {item.screenings && item.screenings.part1Completed ? (
                      <CiCircleCheck className="text-blue-500" />
                    ) : (
                      <CiCircleCheck className="text-gray-400" />
                    )}
                  </li>

                  <li className="flex items-center justify-start">
                    <span className="mr-2">Screening Part 2</span>
                    {item.screenings && item.screenings.part2Completed ? (
                      <CiCircleCheck className="text-blue-500" />
                    ) : (
                      <CiCircleCheck className="text-gray-400" />
                    )}
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative w-1/4 h-1.5 p-1 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="absolute pl-4 top-0 left-0 h-full bg-teal-500 text-white text-xs text-center flex items-center justify-center"
                    style={{
                      width: `${item.jobMatchProgress}%`,
                    }}
                  >
                    {item.jobMatchProgress}%
                  </div>
                </div>

                <div className="ml-2 text-gray-500 text-xs">No attachment</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragAbleItem;
