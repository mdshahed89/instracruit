"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "../../public/logo.png";
import AdminUserIcon from "../Components/AdminUserIcon.jsx";
import { toast } from "react-toastify";

export default function AdminProfileModal({ userData }) {
  console.log(userData);
  const [formData, setFormData] = useState({
    name: userData?.name,
    email: userData?.email,
  });
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      if (formData?.password !== confirmPassword) {
        toast.error("password and confirm password should be match");
        setloading(false)
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update/${userData?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const fatchedData = await res.json();

      if (res.ok) {
        toast.success("Information updated successfully");
        setFormData({
          password: ''
        })
        setconfirmPassword('')
      } else {
        toast.error(fatchedData.message || "Information updation failed");
        setFormData({
          name: userData?.name,
          email: userData?.email,
          password: ''
        })
        setconfirmPassword('')
      }

      setloading(false);
    } catch (error) {
      toast.error(error.message || "Updating admin information failed");
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className=" z-[1000000] text-white ">
      <div className=" bg-[#222121] py-4 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className=" max-w-[1000px] mx-auto flex items-center justify-between px-3 "
        >
          <Image
            src={Logo}
            alt="Logo"
            loading="lazy"
            className=" w-[6rem] object-cover "
          />

          <AdminUserIcon id={userData?._id} profile={true} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 1 }} className=" max-w-[600px] mx-auto border border-[#830e70] rounded-2xl lg:px-14 md:px-7 px4 lg:py-12 py-6 mt-20 font-Montserrat ">
        <h3 className=" text-[1.8rem] font-semibold uppercase ">
          Admin Profile
        </h3>
        <form onSubmit={handleSubmit} className=" text-[1.2rem] mt-5 flex flex-col gap-5 ">
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              value={formData?.name}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={formData?.email}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData?.password}
              onChange={handleChange}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>

          <div className=" mt-5 ">
            <button className=" w-full bg-[#830e70] font-semibold py-3 rounded-full ">
              {
                loading ? "Loading..." : "Submit"
              }
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
