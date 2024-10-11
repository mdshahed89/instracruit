import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DynamicField {
  value: string;
}

function Forespørselsinformasjonsfelt() {
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([
    { value: "" },
  ]);
  const [askForCV, setAskForCV] = useState(false);

  const addNewDynamicField = () => {
    setDynamicFields((prevFields) => [...prevFields, { value: "" }]);
  };

  const updateDynamicFieldValue = (index: number, newValue: string) => {
    if (index >= 0 && index < dynamicFields.length) {
      const newFields = [...dynamicFields];
      newFields[index].value = newValue;
      setDynamicFields(newFields);
    } else {
      console.error("Invalid index for field update");
    }
  };

  const removeDynamicField = (index: number) => {
    setDynamicFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const saveFormData = () => {
    const formData = {
      dynamicFields,
      askForCV,
    };

    toast.success("Form saved successfully!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="bg-white rounded-lg max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">
        Be om mer informasjonsfelt
      </h2>
      <p className="text-gray-500 mb-4">
        Forhåndsdefiner hva slags informasjon du vil spørre søkeren når du ber
        om mer informasjon.
      </p>
      <p className="text-gray-600 mb-6">Legg til felt i skjemaet</p>

      {dynamicFields.map((field, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="text"
            value={field.value}
            onChange={(e) => updateDynamicFieldValue(index, e.target.value)}
            placeholder="Hva motiverer deg til å jobbe med salg?"
            className="w-full p-2 border text-black rounded-md"
          />
          <button
            className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md"
            onClick={() => removeDynamicField(index)}
          >
            Fjern
          </button>
        </div>
      ))}

      <button
        className="bg-[#830e70] text-white px-4 py-2 rounded-md mb-6"
        onClick={addNewDynamicField}
      >
        Legg til felt
      </button>

      <hr className="border-gray-300 my-4" />

      <h3 className="text-xl font-semibold text-gray-700 mb-2">Ask for CV</h3>
      <div className="flex items-start">
        <input
          type="checkbox"
          id="askForCV"
          checked={askForCV}
          onChange={(e) => setAskForCV(e.target.checked)}
          className="mr-2 w-6 h-6 text-[#830e70] border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor="askForCV" className="text-gray-600">
          Be om CV i automatisk "Request More Info".
        </label>
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="bg-[#830e70] text-white px-6 py-2 rounded-md"
          onClick={saveFormData}
        >
          Save
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Forespørselsinformasjonsfelt;
