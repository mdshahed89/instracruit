"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

interface ScreeningData {
  title: string;
  questions: { question: string; answer: string }[];
}

interface InformationData {
  label: string;
  value: string;
}

interface ResumeData {
  title: string;
  description: string;
  buttonLabel: string;
}

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

interface Screenings {
  part1Completed: boolean;
  part2Completed: boolean;
}

interface Columns {
  [key: string]: Column;
}

export default function CandidateProfile() {
  const [screening, setScreening] = useState<ScreeningData[]>([]);
  const router = useRouter();
  const { id } = useParams();
  const [screenings, setScreenings] = useState<ScreeningData[]>([]);
  const [candidateName, setCandidateName] = useState<string>("Unknown");
  const [customerInfo, setCustomerInfo] = useState<InformationData[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([""]);
  const [requestCV, setRequestCV] = useState<boolean>(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<{ _id: string } | null>(null);
  const [columns, setColumns] = useState<Columns>({
    "ikke-kvalifisert": { name: "Ikke kvalifisert", items: [] },
    "nye-søkere": { name: "Nye søkere", items: [] },
    utdannet: { name: "Utdannet", items: [] },
    intervju: { name: "Intervju", items: [] },
    Slippav: { name: "Slipp av", items: [] },
    tilby: { name: "Tilby", items: [] },
    ansatt: { name: "Ansatt", items: [] },
  });
  const [selectedColumn, setSelectedColumn] = useState<string>(""); // State for selected column

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle dropdown change
  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value);
  };

  const moveLeadToSelectedColumn = async () => {
    if (selectedColumn && data && data._id) {
      const updatedColumns = { ...columns };

      // Find the current column of the candidate
      Object.keys(updatedColumns).forEach((columnId) => {
        updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
          (item) => item.id !== data._id
        );
      });

      updatedColumns[selectedColumn].items.push({
        id: data._id,
        name: candidateName,
        jobMatchProgress: progress,
        screenings: {
          part1Completed: screenings.some((s) => s.questions.length > 0),
          part2Completed: screenings.some((s) =>
            s.questions.some((q) => q.answer !== "")
          ),
        },
      });

      // Update the state locally
      setColumns(updatedColumns);

      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          toast.error("No auth token found. Please log in.");
          return;
        }

        // Update the candidate's column position on the back-end
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${data._id}/position`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ columnPosition: selectedColumn }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to move candidate.");
        }

        toast.success("Candidate moved successfully!");
        toggleModal(); // Close the modal after successful move
      } catch (error) {
        console.error("Error moving candidate:", error);
        toast.error("Failed to move candidate.");
      }
    } else {
      toast.error("Please select a valid column or candidate.");
    }
  };

  const addNewField = () => {
    setQuestions((prevQuestions) => [...prevQuestions, ""]);
  };

  const navigateToDashboard = () => {
    if (data && data._id) {
      router.push(`/dashboard/${data._id}`);
    } else {
      console.error("Data is not available or _id is missing");
    }
  };

  const handleCVCheckboxChange = () => {
    setRequestCV(!requestCV);
  };

  const removeField = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const sendEmail = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("No auth token found. Please log in.");
      return;
    }

    const candidateEmail =
      customerInfo.find((info) => info.label === "E-post")?.value || "N/A";

    if (candidateEmail === "N/A") {
      toast.error("Candidate email not found!");
      return;
    }

    const emailData = {
      to: candidateEmail,
      subject: "Vennligst send din CV og svar på noen spørsmål",
      text: `Kjære ${candidateName},
            Vennligst send din CV ved å klikke på lenken under og besvare følgende spørsmål:
            ${questions.join("\n")}
            ${process.env.NEXT_PUBLIC_FRONTEND_URL}/questions/${id}
          `,
      candidateId: id,
      questions,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/send-email`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email.");
      }

      toast.success("Email sent and questions saved successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          "Error sending email: " + (error.message || "Unknown error")
        );
      } else {
        toast.error("Unknown error");
      }
    }
  };

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("No auth token found. Please log in.");
        return;
      }

      try {
        const response1 = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response1.ok) {
          throw new Error("Failed to fetch candidate details");
        }

        const data1 = await response1.json();

        setCandidateName(data1.customerInfo.fulltNavn || "Unknown");

        setCustomerInfo([
          { label: "E-post", value: data1.customerInfo.epost || "N/A" },
          {
            label: "Telefon",
            value: data1.customerInfo.telefonnummer || "N/A",
          },
          { label: "By", value: data1.customerInfo.by || "N/A" },
          { label: "Adresse", value: data1.customerInfo.adresse || "N/A" },
          {
            label: "Postnummer",
            value: data1.customerInfo.postnummer || "N/A",
          },
        ]);

        setProgress(data1.jobMatchProgress || 0);

        const response2 = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${id}/screening-answers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response2.ok) {
          throw new Error("Failed to fetch screening answers");
        }

        const data2 = await response2.json();

        setData(data1);

        setResumeUrl(data2.resumeUrl);

        setScreenings([
          {
            title: "Screening del 1",
            questions: data1.quizzes.length
              ? data1.quizzes.map((quiz: any) => ({
                  question: quiz.question,
                  answer: quiz.answer || "No answer provided",
                }))
              : [{ question: "No answers added.", answer: "" }],
          },
          {
            title: "Screening del 2",
            questions: data2.answers.map((answer: string, index: number) => ({
              question: data2.questions[index],
              answer: answer || "No answer provided",
            })),
          },
        ]);

        console.log(
          "Screenings state updated with both Screening del 1 and del 2"
        );
      } catch (error) {
        console.error("Error fetching candidate data:", error);
        setError("Failed to load candidate details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateDetails();
  }, [id]);

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  const resumeData: ResumeData = {
    title: "Resumé",
    description: "Ingen CV lastet opp",
    buttonLabel: "Be om CV",
  };

  if (!id) return;

  const handleDecrease = () => {
    setProgress((prev) => {
      const newProgress = Math.max(prev - 1, 0);
      saveProgressToDatabase(newProgress);
      return newProgress;
    });
  };

  const handleIncrease = () => {
    setProgress((prev) => {
      const newProgress = Math.min(prev + 1, 100);
      saveProgressToDatabase(newProgress);
      return newProgress;
    });
  };

  const saveProgressToDatabase = async (newProgress: number) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("No auth token found. Please log in.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${id}/job-match`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress: newProgress }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job match progress.");
      }

      toast.success("Job match updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update job match. Please try again.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>Loading candidate data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-[#830e70] p-6 sm:p-8 lg:p-10 text-center relative">
        <div
          className="absolute top-4 left-4 flex hover:bg-gray-900 p-2 hover:rounded-md items-center space-x-2 cursor-pointer"
          onClick={navigateToDashboard}
        >
          <FaArrowLeft className="text-white" size={18} />
          <h1 className="text-white">Tilbake</h1>
        </div>

        <button
          className="absolute top-4 right-4 bg-white text-[#830e70] px-4 py-2 rounded hover:bg-[#830e70] hover:text-white shadow-md"
          onClick={toggleModal}
        >
          Flytt lead
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                onClick={toggleModal}
              >
                &times;
              </button>

              <h2 className="text-xl font-bold text-[#830e70] mb-4">
                Move lead
              </h2>
              <p className="text-gray-500 mb-4">Select Location</p>

              <select
                className="w-full border border-gray-300 text-black rounded p-2 mb-4"
                value={selectedColumn} // Bind the selected value
                onChange={handleColumnChange} // Call the change handler
              >
                <option value="">Select Location</option>
                {Object.entries(columns).map(([columnId, column]) => (
                  <option key={columnId} value={columnId}>
                    {column.name}
                  </option>
                ))}
              </select>

              <button
                className="bg-[#830e70] text-white px-4 py-2 rounded w-full hover:bg-[#6e0b5a]"
                onClick={moveLeadToSelectedColumn} // Move lead when clicking
              >
                Move
              </button>
            </div>
          </div>
        )}

        <div className="inline-block bg-white rounded-full p-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-500 text-white text-3xl sm:text-4xl flex items-center justify-center">
            {candidateName.charAt(0)}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mt-2">{candidateName}</h2>

        <div className="text-white">
          I listen / <span className="text-blue-600">Pending</span>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {screenings.length > 0 ? (
            screenings.map((screening, screeningIndex) => (
              <div
                key={screeningIndex}
                className="border-4 p-4 sm:p-5 rounded-lg shadow-md bg-white border-[#830e70] mb-4 sm:mb-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-green-600 text-lg sm:text-xl">
                      {screening.title}
                    </h3>
                    {screening.questions && screening.questions.length > 0 ? (
                      screening.questions.map((questionData, index) => (
                        <div key={index} className="mt-3 sm:mt-4">
                          <p className="text-gray-700 font-semibold">
                            {questionData.question}
                          </p>
                          <p className="mt-1 text-gray-700">
                            {questionData.answer || "No answer provided"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-700">No questions available</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No screenings available</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border-4 border-[#830e70] p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
            <h3 className="text-md sm:text-lg font-bold text-black mb-4 sm:mb-6">
              Information
            </h3>

            <div className="border-t border-gray-200 py-2 sm:py-4">
              {customerInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b border-gray-200 last:border-none"
                >
                  <p className="font-semibold text-black">{info.label}</p>
                  <p className="text-black">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-[#830e70] bg-white p-4 rounded-lg shadow-md mb-4 sm:mb-6">
            <h3 className="font-bold text-black text-md sm:text-lg mb-2">
              {resumeData.title}
            </h3>
            <hr className="mb-2" />
            <p className="text-gray-500">{resumeData.description}</p>
            <button
              className="mt-4 bg-[#830e70] text-white py-2 px-4 rounded-md"
              onClick={openModal}
            >
              {resumeData.buttonLabel}
            </button>

            {resumeUrl && (
              <div className="flex justify-center mt-4">
                <a
                  href={resumeUrl.replace("/upload/", "/upload/fl_attachment/")}
                  download={resumeUrl.split("/").pop()?.split("?")[0]}
                  className="bg-[#830e70] text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Download Resume
                </a>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-300 p-4 h-24 sm:h-28 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-black text-md sm:text-lg">
                Jobbmatch
              </h3>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDecrease}
                className="text-[#830e70] flex items-center"
              >
                <FaMinus />
              </button>
              <input
                type="range"
                className="mx-4 w-full"
                min="0"
                max="100"
                value={progress}
                readOnly
              />
              <span className="text-black">{progress}%</span>
              <button
                onClick={handleIncrease}
                className="text-[#830e70] flex items-center"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
            <h3 className="font-bold text-md sm:text-lg mb-4">
              Lagre tilbakemelding
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700">Lede handlinger</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Request more info</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Din tilbakemelding</label>
              <textarea
                className="w-full p-2 border text-black border-gray-300 rounded"
                placeholder="You can write here a feedback"
              />
            </div>
            <div className="mb-4">
              {questions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => handleQuestionChange(e, index)}
                    placeholder="Hva motiverer deg til å jobbe med salg?"
                    className="border border-gray-300 text-black rounded p-2 w-full"
                  />
                  <button
                    onClick={() => removeField(index)}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Fjerne
                  </button>
                </div>
              ))}
              <button
                onClick={addNewField}
                className="bg-[#830e70] mt-4 text-white py-2 px-4 rounded"
              >
                Legg til felt
              </button>
            </div>
            <div className="mb-4">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  className="mr-2"
                  onClick={handleCVCheckboxChange}
                />
                Be om CV?
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              >
                Avbryt
              </button>
              <button
                className="bg-[#830e70] text-white py-2 px-4 rounded"
                onClick={sendEmail}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
