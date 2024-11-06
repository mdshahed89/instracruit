"use client";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCog, FaSignOutAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { closestCorners, DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { closestCenter, DragEndEvent } from "@dnd-kit/core";
import { ToastContainer, toast } from "react-toastify";
import { CiCircleCheck } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { PiSquaresFour } from "react-icons/pi";
import { CgOrganisation } from "react-icons/cg";
import { RxExit } from "react-icons/rx";
import Logo from "../../public/images/logo.png"

import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface Item {
  id: string;
  name: string;
  jobMatchProgress: number;
  screenings: Screenings;
}

interface Column {
  name: string;
  items: Item[];
}

interface Columns {
  [key: string]: Column;
}

interface Screenings {
  part1Completed: boolean;
  part2Completed: boolean;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(true);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState<boolean>(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        localStorage.removeItem("authToken");
        toast.success("Logout successful!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast.error("Failed to logout.");
      });
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }
          return response.json(); // Parse the response as JSON
        })
        .then((data) => {
          setUserEmail(data.email); // Set the fetched email
          setUserName(data.name); // Set the fetched name
          setLoading(false); // Mark loading as complete
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          toast.error("Failed to fetch user info. Please log in again.");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        });
    } else {
      toast.error("No auth token found. Redirecting to login.");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <div>
      {/* <ToastContainer /> */}
      <motion.div
        animate={{ width: isOpen ? "auto" : 80 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-black h-screen border-r border-gray-700 text-white shadow-lg flex flex-col justify-between relative"
        style={{ zIndex: 50 }}
        onAnimationComplete={() => setIsAnimationComplete(isOpen)}
      >
        {/* Sidebar content */}
        <div className="p-4 ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center"
          >
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="Instacruit"
                className="h-12 md:h-16"
              />
            </Link>
          </motion.div>

          {isAnimationComplete && isOpen && (
            <div className="mt-10">
              <div className="cursor-pointer" onClick={toggleDropdown1}>
                <div className="flex items-center justify-between text-white border border-gray-700 bg-black p-2 rounded w-full">
                  <div className="flex items-center">
                    <CgOrganisation className="mr-2" />{" "}
                    {/* By default show "Organisasjon" or company */}
                    <span className="ml-1 text-sm">{"Selskap"}</span>
                  </div>
                  {isDropdownOpen1 ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {/* Render the dropdown options when it's open */}
              {isDropdownOpen1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="mt-1 bg-black p-2 rounded w-full"
                >
                  <ul className="pl-2">
                    <li className="py-1 cursor-pointer pl-2 hover:bg-white bg-[#830e70] hover:text-black rounded">
                      {/* Show the userName as a dropdown option */}
                      <a href="#" className="block w-full h-full">
                        {userName || "User Name"}
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          )}

          {isAnimationComplete && isOpen && (
            <div className="mt-10">
              <div className="cursor-pointer">
                <div className="flex items-center justify-between text-white border border-gray-700 bg-[#830e70] p-2 rounded w-full">
                  <div className="flex items-center">
                    <PiSquaresFour className="mr-2" size={24} />{" "}
                    <span>Kontrollpanel</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isAnimationComplete && isOpen && (
            <div className="mt-72">
              <div className="cursor-pointer" onClick={toggleDropdown2}>
                <div className="flex items-center justify-between text-white border border-gray-700 bg-[#830e70] p-2 rounded w-full">
                  <div className="flex items-center">
                    <FaGear className="mr-2" />{" "}
                    <span className="ml-1 text-sm">Innstillinger</span>
                  </div>
                  {isDropdownOpen2 ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {/* Render options when the dropdown is open */}
              {isDropdownOpen2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="mt-2 bg-[#830e70] p-2 rounded w-full"
                >
                  <ul className="pl-2">
                    <li className="py-1 cursor-pointer pl-2 hover:bg-white hover:text-black rounded">
                      <a href="/setting" className="block w-full h-full">
                        Organisasjon
                      </a>
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* User email section */}
        <div className="p-4 border-t -mt-1 border-gray-800">
          {isAnimationComplete && isOpen && (
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <FaUserCircle size={18} />
                <span className="ml-4">{userEmail || "email@example.com"}</span>
              </motion.div>
              <RxExit
                size={24}
                className="cursor-pointer pl-2"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>

        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-[-6px] text-white p-2 rounded-full shadow-lg transform transition-transform"
          style={{ zIndex: 100 }}
        >
          {isOpen ? (
            <HiOutlineChevronLeft size={24} />
          ) : (
            <HiOutlineChevronRight size={24} />
          )}
        </button>
      </motion.div>
    </div>
  );
};

interface Candidate {
  _id: string;
  customerInfo?: {
    fulltNavn?: string;
  };
  jobMatchProgress?: number;
  columnPosition?: string;
  screenings?: {
    part1Completed?: boolean;
    part2Completed?: boolean;
  };
}

const fetchCandidates = async (): Promise<Candidate[] | undefined> => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("No auth token found, redirecting to login.");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        toast.error("Session expired, please log in again.");
        localStorage.removeItem("authToken");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast.error("Failed to fetch candidates.");
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const candidates: Candidate[] = await response.json();

    const updatedCandidates = await Promise.all(
      candidates.map(async (candidate: Candidate) => {
        const candidateId = candidate._id;

        try {
          const screeningsResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${candidateId}/screening-answers`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!screeningsResponse.ok) {
            console.error(
              `Failed to fetch screenings for candidate: ${candidateId}`
            );
            return candidate;
          }

          const screeningsData = await screeningsResponse.json();
          const hasQuestions = screeningsData.questions.length > 0;
          const hasAnswers = screeningsData.answers.length > 0;

          return {
            ...candidate,
            screenings: {
              part1Completed: hasQuestions,
              part2Completed: hasAnswers,
            },
          };
        } catch (error) {
          console.error(
            `Error fetching screenings for candidate: ${candidateId}`,
            error
          );
          return candidate;
        }
      })
    );

    return updatedCandidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    toast.error("Failed to fetch candidates.");
  }
};

interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void; // Make onClick optional
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, children, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, active,   } = useDraggable({
    id: id,
  });
  const isDraggingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const style: React.CSSProperties = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    cursor: isDraggingRef.current ? 'grabbing' : 'grab',
    backgroundColor: 'lightblue',
    borderRadius: '4px',
  };
 
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    // Prevent click event on drag
    clickTimeoutRef.current = setTimeout(() => {
      isDraggingRef.current = true; // Indicate dragging started
      listeners?.onMouseDown?.(event as unknown as Event); // Call drag start
    }, 150); // Adjust delay as necessary
  };

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    clearTimeout(clickTimeoutRef.current!); // Clear the timeout if mouse is released
    if (!isDraggingRef.current) {
      onClick?.(event); // Call onClick if it was a click
    }
    isDraggingRef.current = false; // Reset dragging state
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false; // Reset dragging state when drag ends
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
};

const DroppableColumn = (props: { id: string; children: React.ReactNode }) => {
  const { setNodeRef, isOver, active } = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? "#cbd5e1" : "gray",
    transition: "background-color 0.3s ease",
    PointerEvent: 'none'
  };
  return (
    <div
      ref={setNodeRef}
      className="rounded-lg p-2 min-h-[500px]"
      style={style}
    >
      {props.children}
    </div>
  );
};

// const MainDashboard = () => {
//   const router = useRouter();

//   const handleCandidateClick = (candidateId: string) => {
//     router.push(`/candidate/${candidateId}`);
//   };

//   const [columns, setColumns] = useState<Columns>({
//     "ikke-kvalifisert": { name: "Ikke kvalifisert", items: [] },
//     "nye-søkere": { name: "Nye søkere", items: [] },
//     utdannet: { name: "Utdannet", items: [] },
//     intervju: { name: "Intervju", items: [] },
//     Slippav: { name: " Slipp av", items: [] },
//     tilby: { name: "Tilby", items: [] },
//     ansatt: { name: "Ansatt", items: [] },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const candidates = await fetchCandidates();

//         if (Array.isArray(candidates) && candidates.length > 0) {
//           const newColumns = { ...columns };

//           Object.keys(newColumns).forEach((columnId) => {
//             newColumns[columnId].items = [];
//           });

//           candidates.forEach((candidate) => {
//             const columnId = candidate.columnPosition || "ikke-kvalifisert";

//             if (!newColumns[columnId]) {
//               newColumns[columnId] = { name: columnId, items: [] };
//             }

//             newColumns[columnId].items.push({
//               id: candidate._id,
//               name: candidate.customerInfo?.fulltNavn || "Unknown",
//               jobMatchProgress: candidate.jobMatchProgress || 0,
//               screenings: {
//                 part1Completed: candidate.screenings?.part1Completed || false,
//                 part2Completed: candidate.screenings?.part2Completed || false,
//               },
//             });
//           });

//           setColumns(newColumns);
//         } else {
//           console.error("No candidates found or candidates is not an array.");
//         }
//       } catch (err) {
//         console.error("Error fetching candidates:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDragEnd = async (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (!over) return;

//     const activeColumnId = Object.keys(columns).find((columnId) =>
//       columns[columnId].items.some((item) => item.id === active.id)
//     );
//     const overColumnId = over.id;

//     if (activeColumnId && activeColumnId !== overColumnId) {
//       const activeItems = [...columns[activeColumnId].items];
//       const overItems = [...columns[overColumnId].items];
//       const movedItem = activeItems.find((item) => item.id === active.id);

//       if (movedItem) {
//         setColumns({
//           ...columns,
//           [activeColumnId]: {
//             ...columns[activeColumnId],
//             items: activeItems.filter((item) => item.id !== active.id),
//           },
//           [overColumnId]: {
//             ...columns[overColumnId],
//             items: [...overItems, movedItem],
//           },
//         });

//         try {
//           const token = localStorage.getItem("authToken");
//           await fetch(
//             `https://instacruit-backend.vercel.app/api/candidates/${movedItem.id}/position`,
//             {
//               method: "PUT",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({ columnPosition: overColumnId }),
//             }
//           );
//         } catch (error) {
//           console.error("Failed to update candidate position:", error);
//         }
//       }
//     }
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <div className="min-h-screen bg-black text-white overflow-x-hidden flex-grow">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex justify-between items-center mb-8">
//             <div className="pl-10">
//               <h1 className="text-3xl font-bold">Kandidat</h1>
//               <p className="text-white">
//                 Dette er alle kandidatene for stillingen hos Instacall AS.
//               </p>
//             </div>
//             <div className="ml-auto">
//               <a
//                 href="/candidate_details"
//                 className="flex items-center bg-[#830e70] text-white px-6 py-2 rounded-lg hover:bg-[#6b0d5b] whitespace-nowrap"
//               >
//                 <FaUserPlus className="mr-2" />
//                 Legg til ny kandidat
//               </a>
//             </div>
//           </div>

//           <div className="overflow-x-hidden">
//             <div className="overflow-x-auto ">
//               <div className="flex gap-4">
//                 {Object.entries(columns).map(([columnId, column], index) => (
//                   <DroppableColumn key={columnId} id={columnId}>
//                     <div
//                       className={`rounded-lg p-2 min-h-[500px] min-w-[220px] ${
//                         index < Object.entries(columns).length - 1 ? " " : ""
//                       }`}
//                     >
//                       <h2 className="font-semibold mb-4 text-center">
//                         {column.name}
//                       </h2>
//                       {column.items.map((item) => (
//                         <DraggableItem key={item.id} id={item.id}>
//                           <div className="relative bg-white text-black p-2 rounded-lg mb-4 cursor-pointer">
//                             <div
//                               className={`bg-white ${
//                                 columnId === "ikke-kvalifisert" ? "p-1" : "p-2"
//                               } rounded-lg w-full`}
//                               style={{ zIndex: 999 }}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 e.preventDefault();
//                                 handleCandidateClick(item.id);
//                               }}
//                             >
//                               <div
//                                 className={`flex items-center ${
//                                   columnId === "ikke-kvalifisert"
//                                     ? "mb-2"
//                                     : "mb-4"
//                                 }`}
//                               >
//                                 <div className="bg-teal-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
//                                   {item.name.charAt(0).toUpperCase()}
//                                 </div>

//                                 <span
//                                   className={`text-gray-200 text-md font-semibold ${
//                                     columnId === "ikke-kvalifisert"
//                                       ? "text-sm"
//                                       : "text-md"
//                                   }`}
//                                 >
//                                   {item.name}
//                                 </span>
//                               </div>

//                               {columnId !== "ikke-kvalifisert" && (
//                                 <>
//                                   <div className="border-l-4 border-gray-900 rounded-lg pl-2 mb-2">
//                                     <ul className="list-none text-gray-500 space-y-1">
//                                       <li className="flex items-center justify-start">
//                                         <span className="mr-2">
//                                           Screening Part 1
//                                         </span>
//                                         {item.screenings &&
//                                         item.screenings.part1Completed ? (
//                                           <CiCircleCheck className="text-blue-500" />
//                                         ) : (
//                                           <CiCircleCheck className="text-gray-400" />
//                                         )}
//                                       </li>

//                                       <li className="flex items-center justify-start">
//                                         <span className="mr-2">
//                                           Screening Part 2
//                                         </span>
//                                         {item.screenings &&
//                                         item.screenings.part2Completed ? (
//                                           <CiCircleCheck className="text-blue-500" />
//                                         ) : (
//                                           <CiCircleCheck className="text-gray-400" />
//                                         )}
//                                       </li>
//                                     </ul>
//                                   </div>

//                                   <div className="flex items-center justify-between">
//                                     <div className="relative w-1/4 h-1.5 p-1 bg-gray-300 rounded-full overflow-hidden">
//                                       <div
//                                         className="absolute pl-4 top-0 left-0 h-full bg-teal-500 text-white text-xs text-center flex items-center justify-center"
//                                         style={{
//                                           width: `${item.jobMatchProgress}%`,
//                                         }}
//                                       >
//                                         {item.jobMatchProgress}%
//                                       </div>
//                                     </div>

//                                     <div className="ml-2 text-gray-500 text-xs">
//                                       No attachment
//                                     </div>
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                         </DraggableItem>
//                       ))}
//                     </div>
//                   </DroppableColumn>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DndContext>
//   );
// };
import { useParams } from "next/navigation";
import Image from "next/image";
const MainDashboard = () => {
  const { id } = useParams();
  console.log("hi", id);

  const router = useRouter();

  const handleCandidateClick = (candidateId: string) => {
    console.log("clicked");

    router.push(`/candidate/${candidateId}`);
  };

  const [columns, setColumns] = useState<Columns>({
    "ikke-kvalifisert": { name: "Ikke kvalifisert", items: [] },
    "nye-søkere": { name: "Nye søkere", items: [] },
    utdannet: { name: "Utdannet", items: [] },
    intervju: { name: "Intervju", items: [] },
    Slippav: { name: " Slipp av", items: [] },
    tilby: { name: "Tilby", items: [] },
    ansatt: { name: "Ansatt", items: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidates = await fetchCandidates();

        if (Array.isArray(candidates) && candidates.length > 0) {
          const newColumns = { ...columns };

          Object.keys(newColumns).forEach((columnId) => {
            newColumns[columnId].items = [];
          });

          candidates.forEach((candidate) => {
            const columnId = candidate.columnPosition || "ikke-kvalifisert";

            if (!newColumns[columnId]) {
              newColumns[columnId] = { name: columnId, items: [] };
            }

            newColumns[columnId].items.push({
              id: candidate._id,
              name: candidate.customerInfo?.fulltNavn || "Unknown",
              jobMatchProgress: candidate.jobMatchProgress || 0,
              screenings: {
                part1Completed: candidate.screenings?.part1Completed || false,
                part2Completed: candidate.screenings?.part2Completed || false,
              },
            });
          });

          setColumns(newColumns);
        } else {
          console.error("No candidates found or candidates is not an array.");
        }
      } catch (err) {
        console.error("Error fetching candidates:", err);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = Object.keys(columns).find((columnId) =>
      columns[columnId].items.some((item) => item.id === active.id)
    );
    const overColumnId = over.id;

    if (activeColumnId && activeColumnId !== overColumnId) {
      const activeItems = [...columns[activeColumnId].items];
      const overItems = [...columns[overColumnId].items];
      const movedItem = activeItems.find((item) => item.id === active.id);

      if (movedItem) {
        setColumns({
          ...columns,
          [activeColumnId]: {
            ...columns[activeColumnId],
            items: activeItems.filter((item) => item.id !== active.id),
          },
          [overColumnId]: {
            ...columns[overColumnId],
            items: [...overItems, movedItem],
          },
        });

        try {
          const token = localStorage.getItem("authToken");
          await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${movedItem.id}/position`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ columnPosition: overColumnId }),
            }
          );
        } catch (error) {
          console.error("Failed to update candidate position:", error);
        }
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-black text-white overflow-x-hidden flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="pl-10">
              <h1 className="text-3xl font-bold">Kandidat</h1>
              <p className="text-white">
                Dette er alle kandidatene for stillingen hos Instacall AS.
              </p>
            </div>
            <div className="ml-auto">
              <Link
                href={`${id}/candidate_details`}
                className="flex items-center bg-[#830e70] text-white px-6 py-2 rounded-lg hover:bg-[#6b0d5b] whitespace-nowrap"
              >
                <FaUserPlus className="mr-2" />
                Legg til ny kandidat
              </Link>
            </div>
          </div>

          <div className="overflow-x-hidden">
            <div className="overflow-x-auto ">
              <div className="flex gap-4">
                {Object.entries(columns).map(([columnId, column], index) => (
                  <DroppableColumn key={columnId} id={columnId}>
                    <div
                    aria-disabled
                      onClick={() => {
                        console.log("column clicking");
                      }}
                      className={` pointer-events-none rounded-lg p-2 min-h-[500px] min-w-[220px] -z-30 ${
                        index < Object.entries(columns).length - 1 ? " " : ""
                      }`}
                    >
                      <h2
                        onClick={() => {
                          console.log("column name clicking");
                        }}
                        className="font-semibold mb-4 text-center"
                      >
                        {column.name}
                      </h2>
                      {column.items.map((item) => (
                        <DraggableItem key={item.id} id={item.id} onClick={() => handleCandidateClick(item.id)}>
                          <div>
                            <div
                              style={{
                                pointerEvents: "auto",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                console.log("cicking");

                                // handleCandidateClick(item.id);
                              }}
                              className="relative z-10 bg-white text-black p-2 rounded-lg mb-4 cursor-pointer "
                            >
                              <div onClick={()=>{console.log("happening");
                              }} className=" pointer-events-auto absolute z-[10000000] top-0 left-0 w-full h-full ">
                                
                              </div>
                              <div
                                className={`bg-white ${
                                  columnId === "ikke-kvalifisert"
                                    ? "p-1"
                                    : "p-2"
                                } rounded-lg w-full`}
                              >
                                <div
                                  className={`flex items-center ${
                                    columnId === "ikke-kvalifisert"
                                      ? "mb-2"
                                      : "mb-4"
                                  }`}
                                >
                                  <div className="bg-teal-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                                    {item.name.charAt(0).toUpperCase()}
                                  </div>

                                  <span
                                    className={`text-gray-200 text-md font-semibold ${
                                      columnId === "ikke-kvalifisert"
                                        ? "text-sm"
                                        : "text-md"
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
                                          {item.screenings &&
                                          item.screenings.part1Completed ? (
                                            <CiCircleCheck className="text-blue-500" />
                                          ) : (
                                            <CiCircleCheck className="text-gray-400" />
                                          )}
                                        </li>

                                        <li className="flex items-center justify-start">
                                          <span className="mr-2">
                                            Screening Part 2
                                          </span>
                                          {item.screenings &&
                                          item.screenings.part2Completed ? (
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

                                      <div className="ml-2 text-gray-500 text-xs">
                                        No attachment
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </DraggableItem>
                      ))}
                    </div>
                  </DroppableColumn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

const ProtectedDashboard = ({}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MainDashboard />
    </div>
  );
};

export default ProtectedDashboard;
