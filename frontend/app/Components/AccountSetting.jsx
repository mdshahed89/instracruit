"use client"

import React from 'react'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";


const AccountSetting = ({userData, id}) => {

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

  console.log(userData);
  const [emailChangeData, setEmailChangeData] = useState({
    email: userData?.email,
    password: '',
    confirmPassword: ''
  });
  const [passwordChangeData, setPasswordChangeData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [accountDeletionData, setAccountDeletionData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [loading, setloading] = useState(false);
  const [passChangeLoading, setPassChangeLoading] = useState(false)
  const [accountDeletionLoading, setAccountDeletionLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmailChangeData({
      ...emailChangeData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordChangeData({
      ...passwordChangeData,
      [e.target.id]: e.target.value
    })
  }

  const handleAccountDeletionChange = (e) => {
    setAccountDeletionData({
      ...accountDeletionData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeEmailSubmission = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      if (emailChangeData?.password !== emailChangeData?.confirmPassword) {
        toast.error("password and confirm password should be match");
        setloading(false)
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/change-email/${userData?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailChangeData),
          cache: 'no-store'
        }
      );

      const fatchedData = await res.json();

      if (res.ok) {
        toast.success("Email changed successfully");
        setEmailChangeData({
          password: '',
          confirmPassword: ''
        })
      } else {
        toast.error(fatchedData.message || "Email change failed");
        setEmailChangeData({
          email: userData?.email,
          password: '',
          confirmPassword: ''
        })
      }
      setloading(false);
    } catch (error) {
      toast.error(error.message || "Email change failed");
      console.log(error);
      setloading(false);
    }
  };

  const handlePasswordChangeSubmission = async (e) => {
    e.preventDefault();
    setPassChangeLoading(true);
    try {
      if (passwordChangeData?.newPassword !== passwordChangeData?.confirmPassword) {
        toast.error("password and confirm password should be match");
        setPassChangeLoading(false)
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/change-password/${userData?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordChangeData),
          cache: 'no-store'
        }
      );

      const fatchedData = await res.json();

      if (res.ok) {
        toast.success("Password changed successfully");
        setPasswordChangeData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        toast.error(fatchedData.message || "Password change failed");
        setPasswordChangeData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
      setPassChangeLoading(false);
    } catch (error) {
      toast.error(error.message || "admin password change failed");
      console.log(error);
      setPassChangeLoading(false);
    }
  };

  const handleAccountDeletionSubmission = async (e) => {
    e.preventDefault();
    setAccountDeletionLoading(true);
    try {
      if (accountDeletionData?.password !== accountDeletionData?.confirmPassword) {
        toast.error("password and confirm password should be match");
        setAccountDeletionLoading(false)
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/delete-account/${userData?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accountDeletionData),
          cache: 'no-store'
        }
      );

      const fatchedData = await res.json();

      if (res.ok) {
        toast.success("Account deleted successfully");
        setAccountDeletionData({
          password: '',
          confirmPassword: ''
        })
        localStorage.removeItem("authToken")
        router.push("/admin_login")
      } else {
        toast.error(fatchedData?.message || "Account deletion failed");
        setAccountDeletionData({
          password: '',
          confirmPassword: ''
        })
      }
      setAccountDeletionLoading(false);
    } catch (error) {
      toast.error(error.message || "Account deletion failed");
      console.log(error);
      setAccountDeletionLoading(false);
    }
  };

  return (
    <div className=" z-[1000000] text-white h-full ">
      

      <motion.div initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 1 }} className=" w-full  min-h-[80vh] border-[#830e70] rounded-r-2xl lg:px-14 md:px-7 px-4 py-10  font-Montserrat ">
        


        <form className=" text-[1.2rem] mt-5 flex flex-col gap-5 ">
        <h3 className=" text-[1.8rem] font-semibold uppercase ">
          Change Email
        </h3>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleEmailChange}
              value={emailChangeData?.email}
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
              required
              value={emailChangeData?.password}
              onChange={handleEmailChange}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={emailChangeData?.confirmPassword}
              onChange={handleEmailChange}
              id='confirmPassword'
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>

          <div className=" mt-5 ">
            <button onClick={handleChangeEmailSubmission} className=" w-full bg-[#830e70] font-semibold py-3 rounded-full ">
              {
                loading ? "Loading..." : "Submit"
              }
            </button>
          </div>
        </form>


        <form onSubmit={handlePasswordChangeSubmission} className=" text-[1.2rem] mt-20 flex flex-col gap-5 ">
        <h3 className=" text-[1.8rem] font-semibold uppercase ">
          Change Password
        </h3>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Old Password*
            </label>
            <input
              type="password"
              id="oldPassword"
              onChange={handlePasswordChange}
              required
              value={passwordChangeData?.oldPassword}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              New Password*
            </label>
            <input
              type="password"
              id="newPassword"
              required
              value={passwordChangeData?.newPassword}
              onChange={handlePasswordChange}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Confirm Password*
            </label>
            <input
              type="password"
              required
              id='confirmPassword'
              value={passwordChangeData?.confirmPassword}
              onChange={handlePasswordChange}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>

          <div className=" mt-5 ">
            <button className=" w-full bg-[#830e70] font-semibold py-3 rounded-full ">
              {
                passChangeLoading ? "Loading..." : "Submit"
              }
            </button>
          </div>
        </form>

        <form onSubmit={handleAccountDeletionSubmission} className=" text-[1.2rem] mt-20 flex flex-col gap-5 ">
        <h3 className=" text-[1.8rem] font-semibold uppercase ">
          Delete your account
        </h3>

        <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Password*
            </label>
            <input
              type="password"
              id="password"
              required
              value={accountDeletionData?.password}
              onChange={handleAccountDeletionChange}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Confirm Password*
            </label>
            <input
              type="password"
              required
              id='confirmPassword'
              value={accountDeletionData?.confirmPassword}
              onChange={handleAccountDeletionChange}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>

          <div className=" mt-5 ">
            <button className=" w-full bg-[#c22525] font-semibold py-3 rounded-full ">
              {
                accountDeletionLoading ? "Loading..." : "Delete"
              }
            </button>
          </div>
        </form>


      </motion.div>
    </div>
  )
}

export default AccountSetting