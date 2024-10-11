"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/bar";

type CampaignInfo = {
  stillingsbetegnelse: string;
  kilde: string;
  kampanje: string;
};

type CustomerInfo = {
  fulltNavn: string;
  epost: string;
  telefonnummer: string;
  by: string;
  adresse: string;
  postnummer: string;
};

const campaignInfoFields: Array<{
  placeholder: string;
  field: keyof CampaignInfo;
}> = [
  { placeholder: "Stillingsbetegnelse", field: "stillingsbetegnelse" },
  { placeholder: "Kilde", field: "kilde" },
  { placeholder: "Kampanje", field: "kampanje" },
];

const customerInfoFields: Array<{
  placeholder: string;
  field: keyof CustomerInfo;
  type?: string;
  colspan?: boolean;
}> = [
  { placeholder: "Fullt navn", field: "fulltNavn" },
  { placeholder: "E-post", type: "email", field: "epost" },
  { placeholder: "Telefonnummer", field: "telefonnummer" },
  { placeholder: "By", field: "by" },
  { placeholder: "Adresse", field: "adresse", colspan: true },
  { placeholder: "Postnummer", field: "postnummer" },
];

export default function CandidateForm() {
  // State to hold form data
  const [formData, setFormData] = useState<{
    campaignInfo: CampaignInfo;
    customerInfo: CustomerInfo;
    quizzes: { question: string; answer: string }[];
  }>({
    campaignInfo: {
      stillingsbetegnelse: "",
      kilde: "",
      kampanje: "",
    },
    customerInfo: {
      fulltNavn: "",
      epost: "",
      telefonnummer: "",
      by: "",
      adresse: "",
      postnummer: "",
    },
    quizzes: [],
  });

  const [quizzes, setQuizzes] = useState<
    { question: string; answer: string }[]
  >([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: "campaignInfo" | "customerInfo",
    field: keyof CampaignInfo | keyof CustomerInfo
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value,
      },
    });
  };

  const addQuiz = () => {
    if (quizzes.length > 0) {
      const lastQuiz = quizzes[quizzes.length - 1];
      if (!lastQuiz.question || !lastQuiz.answer) {
        toast.error(
          "Please fill out the current quiz before adding a new one."
        );
        return;
      }
    }
    setQuizzes([...quizzes, { question: "", answer: "" }]);
  };

  const handleQuizChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index][field] = value;
    setQuizzes(updatedQuizzes);
  };

  const submitForm = async () => {
    if (
      quizzes.length > 0 &&
      (!quizzes[quizzes.length - 1].question ||
        !quizzes[quizzes.length - 1].answer)
    ) {
      toast.error("Please complete all quizzes before submitting.");
      return;
    }

    const candidateData = { ...formData, quizzes };

    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "https://instacruit-backend.vercel.app/api/candidates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(candidateData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Candidate added successfully!");

        setFormData({
          campaignInfo: { stillingsbetegnelse: "", kilde: "", kampanje: "" },
          customerInfo: {
            fulltNavn: "",
            epost: "",
            telefonnummer: "",
            by: "",
            adresse: "",
            postnummer: "",
          },
          quizzes: [],
        });
        setQuizzes([]);
      } else {
        toast.error(data.message || "Error adding candidate");
      }
    } catch (error) {
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col justify-center items-center p-4 mt-8">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 mb-8">
          <h2 className="text-xl text-black font-bold mb-4">Campaign Info</h2>
          <div className="space-y-4">
            {campaignInfoFields.map((field, index) => (
              <input
                key={index}
                type="text"
                placeholder={field.placeholder}
                value={formData.campaignInfo[field.field]}
                onChange={(e) =>
                  handleInputChange(e, "campaignInfo", field.field)
                }
                className="w-full p-3 border border-gray-300 rounded-md text-black"
              />
            ))}
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 mb-8">
          <h2 className="text-xl text-black font-bold mb-4">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 text-black sm:grid-cols-2 gap-4">
            {customerInfoFields.map((field, index) => (
              <input
                key={index}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formData.customerInfo[field.field]}
                onChange={(e) =>
                  handleInputChange(e, "customerInfo", field.field)
                }
                className={`${
                  field.colspan ? "sm:col-span-2" : ""
                } w-full p-3 border border-gray-300 rounded-md text-black`}
              />
            ))}
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Quizzes</h2>
          {quizzes.map((quiz, index) => (
            <div key={index} className="space-y-4 mb-4">
              <input
                type="text"
                placeholder="Question"
                value={quiz.question}
                onChange={(e) =>
                  handleQuizChange(index, "question", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-md text-black"
              />
              <input
                type="text"
                placeholder="Answer"
                value={quiz.answer}
                onChange={(e) =>
                  handleQuizChange(index, "answer", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-md text-black"
              />
            </div>
          ))}
          <button
            className="w-full py-4 bg-blue-100 text-blue-600 rounded-lg border border-blue-300"
            onClick={addQuiz}
          >
            + Add Quizz
          </button>
        </div>

        <button
          className="bottom-8 right-8 py-2 px-4 bg-[#830e70] text-white rounded-lg shadow-lg"
          onClick={submitForm}
        >
          Add lead
        </button>
      </div>
    </div>
  );
}
