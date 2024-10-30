"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiTrash } from "react-icons/fi"; // Icon for delete button
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

const Page = ({ params }) => {
  const { cid, id } = params;

  console.log("id", cid);

  const router = useRouter()

useEffect(()=> {
  const token = localStorage.getItem('authToken');
  if(!token){
    router.push("/admin_login")
    return 
  }

  const tokenData = jwtDecode(token);
  console.log(tokenData.id);
  
  if(tokenData?.id !== id){
    router.push("/admin_login")
    return 
  }

}, [])

  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([
    // { id: 1, label: "What's your full name?" },
    // { id: 2, label: "What is your email?" },
    { id: 1, label: "Hvor gammel er du?" },
  ]);
  const [newQuestionLabel, setNewQuestionLabel] = useState("");

  const handleAddQuestion = () => {
    if (newQuestionLabel.trim()) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          id: Date.now(),
          label: newQuestionLabel,
        },
      ]);
      setNewQuestionLabel("");
    }
  };

  // Remove a question by id
  const handleRemoveQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  // Update the value of a specific question
  const handleInputChange = (id, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, value } : q))
    );
  };

  // Handle form submission and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const questionsData = questions.map((q) => q.label);
    console.log("questiondata", questionsData);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/create-job-position`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questions: questionsData,
            dashboardId: cid,
          }),
        }
      );

      if (response.ok) {
        console.log("Questions saved successfully");
        toast.success("Questions added successfully");
        setQuestions([
          // { id: 1, label: "What's your full name?" },
          // { id: 2, label: "What is your email?" },
          { id: 1, label: "Hvor gammel er du?" },
        ]);
      } else {
        console.error("Error saving questions");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("Submit questions error");
    }
  };

  console.log(questions);

  return (
    <div className=" flex items-center min-h-screen px-3 ">
      <motion.div initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay:  0.1, duration: 1 }} className="bg-[#830e70] border-[#830e70] mx-auto max-w-[800px] w-full rounded-xl items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className=" space-y-4 md:space-y-6 flex flex-col w-full md:px-6 px-4 lg:px-12 py-6 md:py-10 "
        >
          <div className=" flex items-center justify-between ">
            <h2 className=" text-[2rem] mb-5 ">Opprett stilling</h2>
            <Link
              href={`/admin_dashboard/${id}/companies`}
              className="bg-[#fff] p-2 rounded-full"
            >
              <MdOutlineArrowBackIos className="text-[#830e70] text-[1.2rem]" />
            </Link>
          </div>
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="relative w-full flex items-center space-x-2"
            >
              <input
                id={`question-${index}`}
                type="text"
                value={q.label}
                readOnly
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                required
                placeholder={q.placeholder}
                className="w-full text-black rounded-full p-3 pl-12 outline-none drop-shadow-lg bg-white"
              />
              <span className="absolute left-1 flex items-center top-0 h-full text-[#454545] text-[1.1rem]">
                Q{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(q.id)}
                className="text-white hover:text-red-500"
              >
                <FiTrash size={20} />
              </button>
            </div>
          ))}

          <div className="relative flex items-center gap-2 ">
            <input
              type="text"
              value={newQuestionLabel}
              onChange={(e) => setNewQuestionLabel(e.target.value)}
              placeholder="Legg til et nytt spørsmål"
              className="w-full text-black rounded-full p-3 pl-4 outline-none drop-shadow-lg bg-white"
            />
            <button
              type="button"
              onClick={handleAddQuestion}
              className="  text-white  rounded"
            >
              <IoIosAddCircleOutline className=" text-[1.5rem] text-[#fff] " />
            </button>
          </div>

          <div className=" pt-6 ">
            <button
              type="submit"
              className="bg-[#000] text-white px-4 py-3 font-semibold rounded-full w-full"
            >
              {loading ? "Laster..." : "Send inn spørsmål"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Page;
