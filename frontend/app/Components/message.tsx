import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/messages/save-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Message saved successfully!");

        setMessage(data.data.message);
      } else {
        toast.error("Failed to save message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="h-96 flex items-center justify-center">
      <div className="w-full bg-white rounded-lg">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Ikke kvalifisert varselmelding
        </h1>
        <p className="text-gray-600 mb-4">
          Her kan du forhåndsdefinere en varslingsmelding som søkeren får når du
          sender ham et varsel om det.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-1"
            >
              Beskjed
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Skriv din melding her..."
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#830e70] hover:bg-purple-700 text-white font-bold py-2 px-6 rounded"
            >
              Save
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default MessageForm;
