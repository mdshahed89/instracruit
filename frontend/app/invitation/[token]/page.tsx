"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { log } from "util";
import { CiLock } from "react-icons/ci";

const RegisterPage = () => {
  const router = useRouter();
  const { token } = useParams();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token!");
    } else {
      console.log("Token from URL:", token);
    }
  }, [token]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true)
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false)
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register-invitation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password, confirmPassword }),
        }
      );

      const data = await response.json();
      console.log(data);
      

      if (!response.ok) {
        if (data.error === "Invitation expired") {
          toast.error("Invitation expired! Please request a new one.");
        } else if (data.error === "Invalid token or invitation not found") {
          toast.error("Invalid or expired token. Please check your link.");
        } else if (data.message === "User already exists") {
          toast.error("This user already exists. Please log in instead.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
        setLoading(false)
        return;
      }

      toast.success("Your profile is activated successfully!");

      router.push(`/login`);
      setLoading(false)
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 ">
      <div className="w-full max-w-[600px] lg:px-14 md:px-7 px-4 py-6 lg:py-12 space-y-16 bg-transparent border border-[#830e70]  rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">
        Aktiver profilen din
        </h2>
        <form onSubmit={handleRegister} className="space-y-6 text-[1rem] md:text-[1.2rem]  ">
          <div>
            <label
              htmlFor="password"
              className="block font-medium mb-2 text-[#fff]"
            >
              Skriv inn passord*
            </label>
            <div className=" relative ">
            <input
              type="password"
              id="password"
              value={password}
              
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Skriv inn passordet ditt"
              className="mt-1 block w-full pl-10 pr-4 py-3 border text-[#fff] outline-none bg-transparent border-gray-300 rounded-full shadow-sm focus:ring-[#830e70] focus:border-[#830e70] hover:border-[#830e70] "
              required
            />
            <div className=" absolute top-0 left-2 h-full flex items-center  ">
            <CiLock className=" text-[1.3rem] text-gray-300 " />
            </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-medium text-white mb-2 "
            >
              Bekreft passord*
            </label>
            <div className=" relative ">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Skriv inn bekreftelsespassordet ditt"
              className="mt-1 block w-full bg-transparent outline-none pl-10 pr-4 py-3 border text-[#fff] border-gray-200 rounded-full shadow-sm focus:ring-[#830e70] hover:border-[#830e70] focus:border-[#830e70]"
              required
            />
            <div className=" absolute top-0 left-2 h-full flex items-center  ">
            <CiLock className=" text-[1.3rem] text-gray-300 " />
            </div>
            </div>

          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 outline-none px-4 border border-transparent rounded-full font-semibold shadow-sm text-white bg-[#830e70]  "
          >
            {
              loading ? "Laster..." : "Aktiver profil"
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
