"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface ScreeningData {
  title: string;
  questions: { question: string; answer: string }[];
}

interface InformationData {
  label: string;
  value: string;
}

const columns = {
  "ikke-kvalifisert": {
    name: "Ikke kvalifisert",
    items: [{ id: "1", name: "Candidate 1" }],
  },
  "nye-søkere": {
    name: "Nye søkere",
    items: [{ id: "2", name: "Candidate 2" }],
  },
  utdannet: {
    name: "Utdannet",
    items: [{ id: "3", name: "Candidate 3" }],
  },
  intervju: {
    name: "Intervju",
    items: [],
  },
  tilby: {
    name: "Tilby",
    items: [],
  },
  ansatt: {
    name: "Ansatt",
    items: [],
  },
};

const informationData: InformationData[] = [
  { label: "E-post", value: "example@example.com" },
  { label: "Telefon", value: "4969499300303" },
  { label: "Fødsel", value: "------" },
  { label: "Lokasjon", value: "------" },
  { label: "Opprettet", value: "------" },
  { label: "UTM-kilde", value: "------" },
  { label: "UTM Medium", value: "------" },
  { label: "UTM-innhold", value: "------" },
  { label: "Kampanje", value: "------" },
];

const resumeData = {
  title: "Resumé",
  description: "Ingen CV lastet opp",
  buttonLabel: "Be om CV",
};

export default function UserProfile() {
  const [screenings, setScreenings] = useState<ScreeningData[]>([]);
  const [candidateName, setCandidateName] = useState<string>("SSSSSSSS");
  const [progress, setProgress] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");

  const handleDecrease = () => {
    setProgress((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleIncrease = () => {
    setProgress((prev) => (prev < 100 ? prev + 1 : 100));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleColumnSelect = (columnName: string) => {
    setSelectedColumn(columnName);
    setIsDropdownOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCandidatesAndScreening = async () => {
      try {
        const response = await fetch(
          "https://instacruit-backend.vercel.app/api/candidates"
        );
        const data = await response.json();
        const candidate = data[0];
        setCandidateName(candidate.customerInfo.fulltNavn);
        const screeningsData = [
          {
            title: "Screening del 1",
            questions: candidate.quizzes.map((quiz: any) => ({
              question: quiz.question,
              answer: quiz.answer,
            })),
          },
          {
            title: "Screening del 2",
            questions: [{ question: "No answers added.", answer: "" }],
          },
        ];

        setScreenings(screeningsData);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      }
    };

    fetchCandidatesAndScreening();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-200 to-blue-500 p-10 text-center relative">
        <button className="text-black absolute top-4 left-4">Tilbake</button>
        <div className="inline-block bg-white rounded-full p-2">
          <div className="w-16 h-16 rounded-full bg-teal-500 text-white text-4xl flex items-center justify-center">
            {candidateName.charAt(0)}{" "}
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-2">{candidateName}</h2>
        <div className="text-gray-500">
          I listen / <span className="text-blue-600">Pending</span>
        </div>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="mt-4 bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            Flytt lead
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-2 w-64 p-4 bg-white rounded-lg shadow-lg z-10 border border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold">Move lead</h3>
                <button onClick={toggleDropdown} className="text-gray-500">
                  &#x2715;
                </button>
              </div>
              <label className="block text-sm text-gray-500 mb-2">
                Select Location
              </label>
              <select
                onChange={(e) => handleColumnSelect(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2 text-gray-700"
              >
                <option value="">Select a column</option>
                {Object.values(columns).map((column, index) => (
                  <option key={index} value={column.name}>
                    {column.name}
                  </option>
                ))}
              </select>
              <button className="mt-4 bg-purple-700 text-white py-2 px-4 rounded-md w-full">
                Move
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto py-8 px-6 lg:px-12 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {screenings.map((screening, screeningIndex) => (
            <div
              key={screeningIndex}
              className="border border-gray-300 p-5 rounded-lg shadow-md bg-white mb-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-green-600 text-xl">
                    {screening.title}
                  </h3>
                  {screening.questions.map((questionData, index) => (
                    <div key={index} className="mt-4">
                      <p className="text-gray-700 font-semibold">
                        {questionData.question}
                      </p>
                      <p className="mt-1 text-gray-700">
                        {questionData.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white mb-6">
            <h3 className="font-bold text-black text-lg mb-2">
              {resumeData.title}
            </h3>
            <hr className="mb-2" />
            <p className="text-gray-500">{resumeData.description}</p>
            <button
              className="mt-4 bg-purple-700 text-white py-2 px-4 rounded-md"
              onClick={openModal}
            >
              {resumeData.buttonLabel}
            </button>
          </div>
          <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-black text-lg">Jobbmatch</h3>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDecrease}
                className="text-purple-700 flex items-center"
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
                className="text-purple-700 flex items-center"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white border border-gray-300 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-6">Information</h3>
          <div className="border-t border-gray-200 py-4">
            {informationData.map((info, index) => (
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
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="font-bold text-lg mb-4">Lagre tilbakemelding</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Lede handlinger</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Request more info</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Din tilbakemelding</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="You can write here a feedback"
              />
            </div>
            <div className="mb-4">
              <button className="bg-purple-700 text-white py-2 px-4 rounded">
                Legg til felt
              </button>
            </div>
            <div className="mb-4">
              <label className="flex items-center text-black">
                <input type="checkbox" className="mr-2" />
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
              <button className="bg-purple-700 text-white py-2 px-4 rounded">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
