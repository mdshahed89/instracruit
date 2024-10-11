"use client";
import { useState } from "react";
import { FaUsers, FaBuilding, FaBell, FaCommentDots } from "react-icons/fa";
import Navbar from "../Components/bar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CompanyForm from "../Components/companyform";
import MessageForm from "../Components/message";
import Forespørselsinformasjonsfelt from "../Components/Forespørselsinformasjonsfelt";

interface DynamicField {
  value: string;
}

export default function SettingsPage() {
  const [selectedMenu, setSelectedMenu] = useState("Bedriftsinformasjon");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([
    { value: "" },
  ]);
  const [askForCV, setAskForCV] = useState(false);

  const addNewDynamicField = () => {
    setDynamicFields((prevFields) => [...prevFields, { value: "" }]);
  };

  const saveFormData = async () => {
    try {
      const response = await fetch(
        "https://instacruit-backend.vercel.app/api/form/save",
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
        toast.success("Form data saved successfully!");
      } else {
        toast.error(`Error saving form data: ${data.message}`);
      }
    } catch (error) {
      toast.error("Error saving form data.");
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

  const inviteUser = async () => {
    if (!name || !email) {
      toast.error("Please fill out both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://instacruit-backend.vercel.app/api/invitations/invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        toast.success("Invitation sent successfully!");
        closePopup();
      } else if (data.error === "User already invited") {
        toast.error("User already invited!");
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.error("Failed to send the invitation. Please try again.");
    } finally {
      setLoading(false);
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
        return <CompanyForm />;
      case "Brukere":
        return (
          <div className="relative text-black p-4 h-48">
            <h2 className="text-xl font-bold">Brukere og invitere brukere</h2>
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
                  <h2 className="text-xl font-bold text-black mb-4">
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
      <Navbar />
      <header className="bg-black text-white p-4 text-center font-bold">
        Innstillinger
      </header>

      <div className="flex p-6 space-x-8">
        <div className="bg-gray-900 text-white shadow-lg rounded-lg w-68 p-6 h-64">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center p-2 cursor-pointer transition-colors duration-300 ${
                  selectedMenu === item.name
                    ? "bg-[#830e70] rounded-lg"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setSelectedMenu(item.name)}
              >
                <item.icon className="mr-2" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-grow bg-white shadow-lg rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
