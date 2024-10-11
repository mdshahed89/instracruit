"use client";
import React from "react";
import { useState } from "react";

export default function UploadCVPage() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([
    "Hva motiverer deg til å jobbe med salg?",
    "Hva er dine styrker?",
  ]);

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  const submitAnswersAndCV = async () => {
    console.log("Answers:", answers);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl px-4 md:px-8 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Svar på spørsmål og last opp CV
        </h2>

        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold text-black">{question}</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full text-black"
              onChange={(e) => handleAnswerChange(e, index)}
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block font-semibold text-black">Last opp CV</label>
          <input
            type="file"
            onChange={handleCVUpload}
            className="w-full text-black"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={submitAnswersAndCV}
            className="bg-purple-700 text-white py-2 px-8 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
