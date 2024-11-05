"use client";
import { log } from "console";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CandidateQuestions() {
  const { candidateId } = useParams();
  console.log("candidateId", candidateId);
  
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitLoadingStatus, setSubmitLoadingStatus] = useState<Boolean>(false)

  useEffect(() => {
    if (!candidateId) return;
    const fetchQuestions = async () => {
      // const token = localStorage.getItem("authToken");

      // if (!token) {
      //   toast.error("No auth token found. Please log in.");
      //   return;
      // }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${candidateId}/get-questions`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     "Content-Type": "application/json",
          //   },
          // }
        );
        const data = await res.json();
        console.log("Fetched questions:", data?.questions);
        setQuestions(data?.questions);
        setAnswers(new Array(data?.questions?.length).fill(""));
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
    setSubmitLoadingStatus(true)
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
      console.log("hihi");
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/${candidateId}/submit-answers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
          credentials: "include"
        }
      );
      // const data = await response.json()
      console.log(response);
      

      if (response.ok) {
        toast.success("Answers and resume submitted successfully!");
      } else {
        toast.error("Error submitting the form.");
      }
      console.log("how");
      setSubmitLoadingStatus(false)
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
      console.log("what");
      setSubmitLoadingStatus(false)
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen px-3 ">
      <div className="bg-[#841F84] text-[#fff] lg:px-16 md:px-12 px-6 lg:py-12 py-6 rounded-lg shadow-lg w-full max-w-5xl">
        <ToastContainer />{" "}
        <h2 className="text-3xl font-bold text-center mb-16 ">
          Answer the questions and upload your CV
        </h2>
        {questions?.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold mb-2 ">{question}</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 outline-none w-full text-black"
              placeholder="Write your answer"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(e, index)}
            />
          </div>
        ))}
        <div className="mt-11">
          <label className="block font-semibold mb-2 ">Upload CV</label>
          <input
            type="file"
            className="w-full "
            onChange={handleResumeChange}
          />
        </div>
        <div className="flex justify-center mt-10 ">
          <button
            className="bg-[#000] w-full font-semibold text-white py-2 px-8 rounded"
            onClick={handleSubmit}
          >
            {submitLoadingStatus ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
