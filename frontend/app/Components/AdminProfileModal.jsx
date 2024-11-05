"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AdminProfileModal({ userData, id }) {

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
  const [formData, setFormData] = useState({
    name: userData?.name,
    email: userData?.email,
    address: userData?.address,
    phoneNo: userData?.phoneNo
  });
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update/${userData?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          cache: 'no-store'
        }
      );

      const fatchedData = await res.json();

      if (res.ok) {
        toast.success("Information updated successfully");
      } else {
        toast.error(fatchedData.message || "Information updation failed");
        setFormData({
          name: userData?.name,
          email: userData?.email,
          address: userData?.address,
          phoneNo: userData?.phoneNo
        })
      }

      setloading(false);
    } catch (error) {
      toast.error(error.message || "Updating admin information failed");
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className=" z-[1000000] text-white h-full ">
      

      <motion.div initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 1 }} className=" w-full  min-h-[80vh] border-[#830e70] rounded-r-2xl lg:px-14 md:px-7 px-4 py-10  font-Montserrat ">
        <h3 className=" text-[1.8rem] font-semibold uppercase ">
          Edit Admin Profile
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
              readOnly
              onChange={handleChange}
              value={formData?.email}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData?.address}
              onChange={handleChange}
              className=" outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="" className=" ml-2 ">
              Phone No.
            </label>
            <input
              type="number"
              id="phoneNo"
              value={formData?.phoneNo}
              onChange={handleChange}
              className=" no-arrows outline-none border focus:border-[#830e70] hover:border-[#830e70] transition-colors duration-300 ease-in-out bg-transparent py-2 px-4 rounded-full "
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
