"use client"
import { useState } from 'react';
import { LuCopy } from 'react-icons/lu';
// import { useRouter } from 'next/navigation'

export default function JobPosition({data}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Spørsmål")
    console.log(data?.questions);
    // const router = useRouter()

    const handleCopyLink = () => {
        const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/jobs/${data?._id}`; // Replace with your desired link
    
        // Copy the link to the clipboard
        navigator.clipboard.writeText(linkToCopy)
          .then(() => {
            alert('Lenke kopiert til utklippstavlen!'); // Optional: Notify the user
          })
          .catch((err) => {
            console.error('Kunne ikke kopiere: ', err);
          });
      };
    
    return (
        <div className=' relative '>
          {/* dropdown - btn */}
            <div className=' flex items-center gap-1 '>
            <div onClick={() => setIsOpen(!isOpen)} className="mx-auto flex w-full items-center justify-between rounded-xl bg-white px-6 py-2 border">
                <h1 className="font-medium text-gray-600">{selectedValue}</h1>
                <svg className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
            </div>
            <button onClick={handleCopyLink} className=" bg-white rounded-md text-black p-2 "> <LuCopy className=' text-[1.2rem] ' /></button>
            
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

