'use client'
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { toast } from 'react-toastify';

export const InviteAdminModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/auth/send-email`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });
              const data = await res.json();
              if(data.success){
                toast.success("Email sent successfully")
              }
              else{
                toast.error(data?.message || "Email sent failed")
              }
              setLoading(false)
              setOpenModal(false)
        } catch (error) {
            toast.error("Error during invite admin")
            console.log(error);
            setLoading(false)
        }
    }

    console.log(formData);
    

    return (
      <div className="mx-auto flex w-72 items-center justify-center">
        <button onClick={() => setOpenModal(true)} className="">
        <BiUserPlus className=' text-[5rem] ' />
        <h4>Inviter Admin</h4>
        </button>
        <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}>
          <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full rounded-lg text-white bg-[#454545] drop-shadow-2xl sm:w-[500px] ${openModal ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-150'}`}>
            <form onSubmit={handleSubmit} className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10">
             <div className=' mb-8 flex items-center justify-between '>
             <h1 className=" text-4xl backdrop-blur-sm">Invite Admin</h1>
             <GiCrossMark onClick={()=>setOpenModal(false)} className=' text-[1.5rem] ' />
             </div>
              <div className=" space-y-5 ">
                <div>
                <label htmlFor="email_navigate_ui_modal" className="block mb-2 ">
                  Name
                </label>
                <div className="relative">
                  <input id="name" onChange={handleChange} type="text" required placeholder="Enter your name" className="block w-full text-black rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white " />
                  <span className="absolute left-2 flex items-center top-0 h-full  text-[1.2rem]  ">
                  <FaRegUser className=' text-[#000] ' />

                  </span>
                </div>
                </div>
                <div>
                <label htmlFor="password_navigate_ui_modal" className="block mb-2 ">
                  Email
                </label>
                <div className="relative">
                  <input id="email" onChange={handleChange} type="email" required placeholder="Enter your email" className="block text-black w-full rounded-lg p-3 pl-10 outline-none drop-shadow-lg bg-white" />
                  <span className="absolute left-2 flex items-center top-0 h-full  text-[1.2rem]">
                  <AiOutlineMail className=' text-[#000] ' />

                  </span>
                </div>
                </div>
              </div>
              {/* button type will be submit for handling form submission*/}
              <button disabled={loading} className="relative py-2.5 px-5 rounded-lg  bg-[#830e70] w-full mt-12 drop-shadow-lg ">
                {
                    loading ? "Loading..." : "Invite"
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }