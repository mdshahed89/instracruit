"use client";
import { useEffect, useState, MouseEvent } from "react";
import { FaUsers, FaBuilding, FaBell, FaCommentDots } from "react-icons/fa";
import Navbar from "../Components/bar";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CompanyForm from "../Components/companyform";
import MessageForm from "../Components/message";
import Forespørselsinformasjonsfelt from "../Components/Forespørselsinformasjonsfelt";
import { jwtDecode } from "jwt-decode";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";


interface DynamicField {
  value: string;
}

export default function SettingsPage() {
  const [selectedMenu, setSelectedMenu] = useState("Bedriftsinformasjon");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | ''>('')
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([
    { value: "" },
  ]);
  const [askForCV, setAskForCV] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter();
  const addNewDynamicField = () => {
    setDynamicFields((prevFields) => [...prevFields, { value: "" }]);
  };

  useEffect(()=> {
    const token  = localStorage.getItem("authToken")
    console.log(token);
    if(token){
      const data: any = jwtDecode(token)

      // console.log(data);
      if(data?.id){
        setUserId(data?.id)
      }
    }
  }, [])

  console.log(userId);
  

  const saveFormData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/form/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: dynamicFields.map((field) => field.value),
            askForCV: askForCV,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast?.success("Form data saved successfully!");
      } else {
        toast?.error(`Error saving form data: ${data.message}`);
      }
    } catch (error) {
      toast?.error("Error saving form data.");
      console.error("Error:", error);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setName("");
    setEmail("");
  };

  const inviteUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault()
    if (!name || !email) {
      toast?.error("Please fill out both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invitations/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, userId }),
        }
      );

      const data = await response.json();
      console.log("Response Status:", response?.status);
      console.log("Response Data:", data);

      if (response.ok) {
        toast?.success("Invitation sent successfully!");
        closePopup();
      } else if (data?.error === "User already invited") {
        toast.error("User already invited!");
      } else {
        toast.error(`Error: ${data?.error}`);
      }
    } catch (error) {
      toast.error("Failed to send the invitation. Please try again.");
    } finally {
      setLoading(false);
      toast.error("Failed to send the invitation. Please try again.");
    }
  };

  const menuItems = [
    { name: "Bedriftsinformasjon", icon: FaBuilding },
    { name: "Brukere", icon: FaUsers },
    { name: "Varslingsmelding", icon: FaBell },
    { name: "Forespørselsinformasjonsfelt", icon: FaCommentDots },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "Bedriftsinformasjon":
        return <CompanyForm id={userId} />;
      case "Brukere":
        return (
          <div className="relative text-black p-4 h-48">
            <h2 className="text-xl cursor-pointer font-bold">Brukere og invitere brukere</h2>
            <p>Inviter nye brukere til bedriften din som rekrutterere.</p>
            <button
              onClick={openPopup}
              className="absolute right-0 bottom-0 bg-[#830e70] text-white px-4 py-2 rounded-md"
            >
              Inviter bruker
            </button>

            {isPopupOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                  <h2
                    className="text-xl font-bold text-black mb-4"
                  >
                    Inviter bruker
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Du kan legge til nye brukere for å behandle potensielle
                    kunder og legge ut jobber.
                  </p>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-black font-semibold"
                    >
                      Navn
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 mt-2 border rounded-md"
                      placeholder="Skriv inn navn"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-black font-semibold"
                    >
                      E-post
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 mt-2 border rounded-md"
                      placeholder="Skriv inn e-post"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={closePopup}
                      className="bg-white border border-[#830e70] text-black px-4 py-2 rounded-md"
                    >
                      Avbryt
                    </button>
                    <button
                      className="bg-[#830e70] text-white px-4 py-2 rounded-md"
                      disabled={loading}
                      onClick={inviteUser}
                    >
                      {loading ? "Sender..." : "Inviter bruker"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case "Varslingsmelding":
        return <MessageForm />;
      case "Forespørselsinformasjonsfelt":
        return <Forespørselsinformasjonsfelt />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar companyName = "N/A" />
      <header className="bg-black text-white p-4 text-center relative font-bold">
        <button onClick={()=> router.back()} className=" absolute bottom-4 left-5 md:left-10 px-6 md:px-8 py-1 border-[#830e70] border rounded-full ">Tilbake</button>
        Innstillinger
      </header>

      <div className="flex py-6 space-x-4 lg:space-x-8">
        <div className={`${ isSidebarOpen? "dashboardSidebarOpen" : "dashboardSidebarClose"} ml-4 transition-all duration-300 ease-linear bg-gray-900 text-white md:relative z-50 absolute shadow-lg rounded-lg w-68 px-3 lg:px-6 py-8  h-[80vh] overflow-y-auto `}>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center p-2 cursor-pointer transition-colors duration-300 ${
                  selectedMenu === item.name
                    ? "bg-[#830e70] rounded-lg"
                    : "hover:bg-gray-700 rounded-lg "
                }`}
                onClick={() => {
                  setSelectedMenu(item.name)
                  setIsSidebarOpen(false)
                }}
              >
                <item.icon className="mr-2" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-grow relative bg-white shadow-lg rounded-lg p-6 h-[80vh] overflow-y-auto ">
          <div onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} className=" cursor-pointer md:hidden block absolute z-50 top-4 right-4 text-white p-2 text-xl rounded-full  bg-[#830e70] ">
          <IoIosArrowBack className={` ${isSidebarOpen ? "" : "rotate-180"} transition-all duration-300 ease-linear `} />

          </div>
          {renderContent()}
        </div>
      <ToastContainer />
      </div>
    </div>
  );
}
