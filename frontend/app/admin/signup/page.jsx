"use client";
import { em } from "framer-motion/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { motion } from "framer-motion";


const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: password,
  });

  const router = useRouter()

  
  useEffect(() => {
      if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const name = params.get("name") || "";
          const email = params.get("email") || "";
          setName(name);
          setEmail(email);
        }
    }, []);
    
    useEffect(() => {
      setFormData((prev) => ({
          ...prev,
        email: email,
        name: name,
        password: password
      }));
    }, [name, email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            if(formData?.password !== confirmPassword){
                toast.error("Password and confirmPassword should mathch")
                return;
            }
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/complete-signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });
              const data = await res.json();
              if(data.success){
                toast.success("Acount Activated Successfully")
                router.push("/admin_login")
              }
              else{
                toast.error(data?.message || "Account Activation Failed")
              }
              setLoading(false)
        } catch (error) {
            toast.error("Submit Failed")
            console.log(error);
            setLoading(false)
        }
    }


  console.log(formData);

  return (
    <div className="mx-auto flex items-center justify-center">
      <div
        className={` z-[100] flex items-center justify-center  min-h-[100vh] w-full px-3  bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          className={` w-full rounded-lg text-white  bg-[#000] drop-shadow-2xl sm:w-[700px] border-2 border-[#830e70] `}
        >
          <form onSubmit={handleSubmit} className="px-5 md:px-10 lg:py-12 py-6 lg:px-16">
            <div className=" mb-12 flex items-center justify-between ">
              <h1 className=" text-2xl sm:text-3xl md:text-4xl backdrop-blur-sm">
                Active Admin Account
              </h1>
            </div>
            <div className=" space-y-5 ">
              <div>
                <label
                  htmlFor="email_navigate_ui_modal"
                  className="block mb-2 "
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    readOnly
                    required
                    placeholder="Enter your name"
                    className="block w-full text-black rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white "
                  />
                  <span className="absolute left-2 flex items-center top-0 h-full  text-[1.2rem]  ">
                    <FaRegUser className=" text-[#000] " />
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password_navigate_ui_modal"
                  className="block mb-2 "
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    required
                    placeholder="Enter your email"
                    className="block text-black w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white"
                  />
                  <span className="absolute left-2 flex items-center top-0 h-full  text-[1.2rem]">
                    <AiOutlineMail className=" text-[#000] " />
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password_navigate_ui_modal"
                  className="block mb-2 "
                >
                  Password*
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    className="block text-black w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white"
                  />
                  <span className="absolute left-2 flex items-center top-0 h-full  text-[1.2rem]">
                    <RiLockPasswordFill className=" text-[#454545] " />
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password_navigate_ui_modal"
                  className="block mb-2 "
                >
                  Confirm Password*
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="password"
                    type="password"
                    required
                    placeholder="Enter confirm password"
                    className="block text-black w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white"
                  />
                  <span className="absolute left-2 flex items-center top-0 h-full  text-[1.2rem]">
                    <RiLockPasswordFill className=" text-[#454545] " />
                  </span>
                </div>
              </div>
            </div>
            {/* button type will be submit for handling form submission*/}
            <button
              disabled={loading}
              className="relative py-2.5 px-5 rounded-lg  bg-[#830e70] w-full mt-12 drop-shadow-lg "
            >
              {loading ? "Loading..." : "Active"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
