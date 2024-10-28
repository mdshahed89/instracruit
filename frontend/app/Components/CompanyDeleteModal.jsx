'use client'

import axios from 'axios';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify';


export default function Modal1({companyId}) {
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteCompany = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/${companyId}`);
    console.log(response);
        
    if(response.data.success){
        toast.success("Company delted successfully")
        window.location.reload()
    }
    else{
        toast.error("Company deletion failed")
    }
    setOpenModal(false)

        } catch (error) {
            toast.error("Company delete error")
            console.log(error);
            setOpenModal(false)
        }
    }

    return (
        <div className="">
            <button onClick={() => setOpenModal(true)} className=" flex items-center ">
            <AiOutlineDelete className=' cursor-pointer hover:text-red-500 transition-colors duration-300 ease-in-out ' />
            </button>
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-md rounded-lg bg-gray-500 p-6 drop-shadow-lg text-white ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'}`}>
                    <svg onClick={() => setOpenModal(false)} className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></svg>
                    <h1 className='  text-center text-[1.6rem] mb-6 '>Are your sure?</h1>
                    <p className="mb-5 text-sm text-center  opacity-80">Do you really want to delete these records? this process cannot be undone</p>
                    <div className="flex justify-end w-full  gap-2">
                        <button onClick={()=>setOpenModal(false)} className=" flex-1 text-base rounded-md bg-emerald-500 hover:bg-emerald-600  py-[6px] text-white duration-150 hover:text-white">
                            Cancel
                        </button>
                        <button onClick={handleDeleteCompany} className=" flex-1 text-base rounded-md bg-rose-600  py-[6px] text-white hover:bg-rose-700">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
}