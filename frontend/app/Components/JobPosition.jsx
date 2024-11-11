"use client"
import axios from 'axios';
import { useState } from 'react';
import { LuCopy } from 'react-icons/lu';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function JobPosition({data, adminId}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(data?.title || 'N/A')
    const [openModal, setOpenModal] = useState(false);



    console.log(data?._id);

    const handleCopyLink = () => {
        const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/jobs/${data?._id}?q=0`; 
    
        navigator.clipboard.writeText(linkToCopy)
          .then(() => {
            // alert('Lenke kopiert til utklippstavlen!'); 
            toast.success("Lenke kopiert til utklippstavlen!")
          })
          .catch((err) => {
            toast.error(`Kunne ikke kopiere: ${err}`)
            console.error('Kunne ikke kopiere: ', err);
          });
      };

      const handleDeleteJob = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/company/job/${data?._id}`,  {
              data: { adminId }, 
            });
    console.log(response);
        
    if(response.data?.success){
        toast.success("Jobben ble slettet vellykket")
        window.location.reload()
    }
    else{
        toast.error("Jobb sletting feilet")
    }
    setOpenModal(false)

        } catch (error) {
            toast.error("Feil ved sletting av jobb")
            console.log(error);
            setOpenModal(false)
        }
    }
    
    return (
        <div className=' relative '>
          {/* dropdown - btn */}
            <div className=' flex items-center gap-1 '>
            <div onClick={() => setIsOpen(!isOpen)} className="mx-auto flex w-full items-center justify-between rounded-xl bg-white px-6 py-2 border">
                <h1 className="font-medium text-gray-600">{selectedValue}</h1>
                <svg className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
            </div>
            <button onClick={handleCopyLink} className=" bg-white rounded-md text-black p-2 "> <LuCopy className=' text-[1.2rem] ' /></button>
            

            <div className="">
            <button onClick={() => setOpenModal(true)} className=" flex items-center p-2 bg-white text-red-500 text-[1.2rem] rounded-md ">
            <MdOutlineDelete className=' cursor-pointer transition-colors duration-300 ease-in-out ' />
            </button>
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-md rounded-lg bg-black p-6 drop-shadow-lg text-white ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'}`}>
                    <svg onClick={() => setOpenModal(false)} className="absolute right-3 top-3 w-6 cursor-pointer text-white fill-white " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></svg>
                    <h1 className='  text-center text-[1.6rem] mb-6 '>Er du sikker?</h1>
                    <p className="mb-5 text-sm text-center  opacity-80">Vil du virkelig slette disse postene? Denne handlingen kan ikke angres.</p>
                    <div className="flex justify-end w-full  gap-2">
                        <button onClick={()=>setOpenModal(false)} className=" flex-1 text-base rounded-md bg-emerald-500 hover:bg-emerald-600  py-[6px] text-white duration-150 hover:text-white">
                        Avbryt
                        </button>
                        <button onClick={handleDeleteJob} className=" flex-1 text-base rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-300 ease-in-out  py-[6px] text-white ">
                        Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>

            
            </div>

            {/* dropdown - options  */}
            <div className={`${isOpen ? 'visible top-8 opacity-100' : 'invisible  -top-4 opacity-0'} absolute left-0 mx-auto my-4 w-full bg-black text-white z-50 rounded-xl py-4 border duration-300`}>
                {data?.questions?.map((dt, idx) => (
                    <div key={idx} onClick={(e) => { setSelectedValue(e.target.textContent); setIsOpen(false);}} className="px-6 py-2 text-white  hover:bg-gray-100">
                        {dt?.question}
                    </div>
                ))}
            </div>
        </div>
    );
}

