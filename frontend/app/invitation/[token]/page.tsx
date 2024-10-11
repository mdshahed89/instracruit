"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const router = useRouter();
  const { token } = useParams();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token!");
    } else {
      console.log("Token from URL:", token);
    }
  }, [token]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `https://instacruit-backend.vercel.app/api/auth/register-invitation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password, confirmPassword }),
        }
      );

      const data = await response.json();

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
        return;
      }

      toast.success("Your profile is activated successfully!");

      router.push(`/dashboard/${data._id}`);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Activate Your Profile
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-[#830e70] focus:border-[#830e70] sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-[#830e70] focus:border-[#830e70] sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#830e70]  focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Activate Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
