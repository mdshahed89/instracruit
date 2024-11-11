'use client'

import React, { useState } from 'react'
import AdminProfileLeft from '../Components/AdminProfileLeft'
import { IoIosArrowForward } from 'react-icons/io'

const WrapProfileComponent = ({children, id}) => {

    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className=' px-3 '>
            <div className=' border border-[#830e70] rounded-md mt-10 flex items-center justify-center max-w-[1300px] mx-auto '>
                <AdminProfileLeft isOpen = {isOpen} setIsOpen = {setIsOpen} id={id}  />

          <div className=' w-full h-[780px] overflow-y-scroll relative  '>
          <div  onClick={()=>setIsOpen(!isOpen)} className=" absolute right-3 top-10 bg-[#830e70] p-2 rounded-full cursor-pointer text-xl md:hidden block ">
        <IoIosArrowForward className={` ${isOpen ? "rotate-180" : ""} transition-all duration-300 ease-linear `} />
        </div>
          {children}
          </div>
            </div>
            </div>
  )
}

export default WrapProfileComponent