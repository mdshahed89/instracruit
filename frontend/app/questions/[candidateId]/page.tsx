"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CandidateQuestions() {
  const { candidateId } = useParams();
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    if (!candidateId) return;
    const fetchQuestions = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("No auth token found. Please log in.");
        return;
      }

      try {
        const res = await fetch(
          `https://instacruit-backend.vercel.app/api/candidates/${candidateId}/get-questions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log("Fetched questions:", data.questions);
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(""));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [candidateId]);
  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      console.log("Selected file:", e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("questions", JSON.stringify(questions));
    formData.append("answers", JSON.stringify(answers));
    formData.append("resume", resumeFile);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://instacruit-backend.vercel.app/api/candidates/${candidateId}/submit-answers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Answers and resume submitted successfully!");
      } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl px-4 md:px-8 space-y-4">
        <ToastContainer />{" "}
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Answer the questions and upload your CV
        </h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold text-black">{question}</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full text-black"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(e, index)}
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block font-semibold text-black">Upload CV</label>
          <input
            type="file"
            className="w-full text-black"
            onChange={handleResumeChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-purple-700 text-white py-2 px-8 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
