import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormDataState {
  companyName: string;
  about: string;
  industry: string;
  website: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  file: File | null;
  userId: string
}

interface CompanyFormProps {
  id: string; // Define the type of the 'id' prop
}

const CompanyForm: React.FC<CompanyFormProps> = ({id}) => {

  // useEffect(()=> {
  //   const token = localStorage.getItem("authToken")
  //   console.log("hello token",token);
    
  // }, [])

  console.log("idid", id);
  
  
  

  const [formData, setFormData] = useState<FormDataState>({
    companyName: "",
    about: "",
    industry: "",
    website: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    file: null,
    userId: ""
  });

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        userId: id // Set the userId dynamically when id prop is available
      }));
    }
  }, [id]);

  console.log("formdata", formData);
  

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormData({
        ...formData,
        file: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("industry", formData.industry);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("facebook", formData.facebook);
    formDataToSend.append("instagram", formData.instagram);
    formDataToSend.append("youtube", formData.youtube);
    formDataToSend.append("linkedin", formData.linkedin);
    formDataToSend.append("userId", formData.userId);

    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await fetch("http://localhost:5000/api/company", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Data saved successfully!");
      } else {
        toast.error("Failed to save data.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
        console.error("Error:", error.message);
      } else {
        toast.error("An unknown error occurred.");
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-black">
        Oppdater bedriftinformasjon
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label
            htmlFor="companyName"
            className="block font-semibold text-black"
          >
            Firmanavn
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />

          <label
            htmlFor="about"
            className="block font-semibold mt-4 text-black"
          >
            Om selskapet / beskrivelse
          </label>
          <textarea
            id="about"
            name="about"
            className="w-full p-2 mt-2 border text-black rounded-md h-32"
            placeholder="Description"
            value={formData.about}
            onChange={handleChange}
          ></textarea>

          <label
            htmlFor="industry"
            className="block font-semibold mt-4 text-black"
          >
            Bedriftsbransjen
          </label>
          <input
            id="industry"
            name="industry"
            type="text"
            className="w-full p-2 mt-2 border text-black rounded-md"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
          />

          <label
            htmlFor="website"
            className="block font-semibold mt-4 text-black"
          >
            Nettsteds URL
          </label>
          <input
            id="website"
            name="website"
            type="url"
            className="w-full p-2 mt-2 text-black border rounded-md"
            placeholder="Website URL"
            value={formData.website}
            onChange={handleChange}
          />

          <label
            htmlFor="facebook"
            className="block font-semibold mt-4 text-black"
          >
            Facebook URL
          </label>
          <input
            id="facebook"
            name="facebook"
            type="url"
            className="w-full p-2 mt-2 border text-black rounded-md"
            placeholder="Facebook URL"
            value={formData.facebook}
            onChange={handleChange}
          />

          <label
            htmlFor="instagram"
            className="block font-semibold mt-4 text-black"
          >
            Instagram URL
          </label>
          <input
            id="instagram"
            name="instagram"
            type="url"
            className="w-full p-2 mt-2 border text-black rounded-md"
            placeholder="Instagram URL"
            value={formData.instagram}
            onChange={handleChange}
          />

          <label
            htmlFor="youtube"
            className="block font-semibold mt-4 text-black"
          >
            YouTube URL
          </label>
          <input
            id="youtube"
            name="youtube"
            type="url"
            className="w-full p-2 mt-2 border text-black rounded-md"
            placeholder="YouTube URL"
            value={formData.youtube}
            onChange={handleChange}
          />

          <label
            htmlFor="linkedin"
            className="block font-semibold mt-4 text-black"
          >
            LinkedIn URL
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            className="w-full p-2 mt-2 border text-black rounded-md"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
          />

          <div className="mt-4">
            <label className="block font-semibold text-black">
              Click to upload a file
            </label>
            <input
              type="file"
              name="file"
              className="mt-2"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="bg-[#830e70] hover:bg-purple-700 text-white font-bold py-2 px-6 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CompanyForm;
