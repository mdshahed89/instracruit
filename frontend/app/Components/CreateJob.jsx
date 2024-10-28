"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const CreateJob = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState([]);
  let questionNo = parseInt(searchParams.get("q"));
  const [questionIndex, setQuestionIndex] = useState(questionNo - 1);
  const [customerInfo, setCustomerInfo] = useState(null)

  const questions = data?.questions?.map(item => item.question) || [];

  console.log("questions", questions);
  

  useEffect(() => {
    const url = new URL(window.location.href);
    const qParam = url.searchParams.get('q');

    // Check if 'q' is not set to '0'
    if (qParam !== '0') {
      // Update the 'q' parameter to '0' and replace the state
      url.searchParams.set('q', '0');
      window.history.replaceState({}, '', url);
      questionNo = 0
      window.location.reload()
    }
  }, []);

  const handleInformationChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  console.log(customerInfo);
  

  useEffect(() => {
    // Initialize the answers array once based on data length
    if (answers.length === 0) {
      setAnswers(Array(data?.questions?.length).fill(""));
    }
  }, [data, answers.length]);

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (questionIndex < data?.questions.length - 1) {
      router.push(`/jobs/${data?._id}?q=${questionIndex + 2}`);
      setQuestionIndex(questionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (questionIndex >= 0) {
      router.push(`/jobs/${data?._id}?q=${questionIndex}`);
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {

      if(!customerInfo){
        toast.error("Candidate Information is required!")
        return
      }

      const ansIsFilled = answers.every(str => str);

      if(!ansIsFilled){
        toast.error("Alle spørsmålssvar er påkrevd")
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/create-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerInfo, questions, answers, dashboardId: data?.dashboardId }),
      });
      const fatchedData = await response.json()
      console.log(fatchedData);
      
      if(response.ok){
        toast.success("Candidate added successfully")
        setAnswers([])
        router.push(`/jobs/${data?._id}?q=0`);
      }
      else{
        toast.error(fatchedData.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  console.log("qno", questionNo);
  console.log("qindex", questionIndex);

  console.log("ans", answers);


  

  if (questionNo >0 && questionNo <= data?.questions.length ) {
    return (
       <div className="flex  items-center justify-center min-h-screen bg-transparent p-4 font-Montserrat ">
      <div className=" flex flex-col bg-[#363636]/50 border border-[#830e70] shadow-[0px_0px_20px_0px_#830e70] rounded-2xl md:px-8 px-5 lg:px-12 py-7 md:py-12 max-w-[30rem] w-full ">
        <h2 className=" text-[1.8rem] ">
          {data?.questions[questionIndex]?.question}
        </h2>
        <div className=" mt-6 text-[1.2rem] ">
        <input
          type="text"
          value={answers[questionIndex] || ""}
          onChange={handleAnswerChange}
          placeholder="Skriv inn svaret ditt"
          className=" w-full  bg-[#363636]/70 py-3 px-4 hover:border-[#830e70] transition-colors duration-300 ease-in-out rounded-full border outline-none focus:border-[#830e70] "
        />
        </div>
        <div className="mt-12 flex  gap-2">
          {questionIndex >= 0 && (
            <button
              onClick={goToPreviousQuestion}
              className="px-4 py-3 bg-transparent hover:bg-[#830e70] transition-colors duration-300 ease-in-out focus:bg-[#830e70] border  border-[#830e70] rounded-full w-full text-white"
            >
              Forrige
            </button>
          )}
          {questionIndex < data?.questions.length - 1 ? (
            <button
              onClick={goToNextQuestion}
              disabled={!answers[questionIndex]}
              className="px-4 py-3 bg-transparent hover:bg-[#830e70] transition-colors duration-300 ease-in-out focus:bg-[#830e70] border  border-[#830e70] rounded-full w-full text-white"
            >
              Neste
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!answers}
              className="px-4 py-3 bg-transparent hover:bg-[#830e70] transition-colors duration-300 ease-in-out focus:bg-[#830e70] border  border-[#830e70] rounded-full w-full text-white"
            >
              Send inn
            </button>
          )}
        </div>
      </div>
    </div> 
    );
  }

  if (questionIndex < -1 || questionIndex >= data?.questions.length) {
    return <p>Ugyldig spørsmål</p>;
  }

  return (
    <div className="flex  items-center justify-center min-h-screen bg-transparent p-4 font-Montserrat ">
        <div className=" flex flex-col bg-[#363636]/50 border border-[#830e70] shadow-[0px_0px_20px_0px_#830e70] rounded-2xl md:px-8 px-5 lg:px-12 py-7 md:py-12 max-w-[30rem] w-full ">
          <h3 className=" text-[1.3rem] ">
          Takk for at du viste interesse for stillingen! Vennligst registrer kontaktinformasjonen din.
          </h3>

          <div className=" mt-5 flex flex-col gap-4 ">
            <div className=" flex flex-col gap-1 text-[1.2rem] ">
              <label htmlFor="">Fullt navn*</label>
              <input
                type="text"
                placeholder="Skriv inn ditt fulle navn"
                name="fulltNavn"
                required
                onChange={handleInformationChange}
                className=" bg-[#363636]/70 py-3 px-4 hover:border-[#830e70] transition-colors duration-300 ease-in-out rounded-full border outline-none focus:border-[#830e70] "
              />
            </div>
            <div className=" flex flex-col gap-2 text-[1.2rem] ">
              <label htmlFor="">E-post*</label>
              <input
                type="email"
                placeholder="Skriv inn e-posten din"
                name="epost"
                required
                onChange={handleInformationChange}
                className=" bg-[#363636]/70 py-3 px-4 hover:border-[#830e70] transition-colors duration-300 ease-in-out rounded-full border outline-none focus:border-[#830e70] "
              />
            </div>
            <div className=" flex flex-col gap-2 text-[1.2rem] ">
              <label htmlFor="">Telefonnummer*</label>
              <input
                type="number"
                placeholder="Skriv inn telefonnummeret ditt"
                name="telefonnummer"
                required
                onChange={handleInformationChange}
                className=" no-arrows  bg-[#363636]/70 py-3 px-4 hover:border-[#830e70] transition-colors duration-300 ease-in-out rounded-full border outline-none focus:border-[#830e70] "
              />
            </div>
          </div>

          <div className="mt-12 flex justify-between space-x-4">
            <button
              onClick={goToNextQuestion}
              disabled={!customerInfo?.fulltNavn || !customerInfo?.epost || !customerInfo?.telefonnummer}
              className="px-4 py-3 bg-transparent hover:bg-[#830e70] transition-colors duration-300 ease-in-out focus:bg-[#830e70] border  border-[#830e70] rounded-full w-full text-white"
            >
              Neste
            </button>
          </div>
        </div>
      </div>
  );
};

export default CreateJob;


