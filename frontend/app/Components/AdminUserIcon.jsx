"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Link from "next/link";

export default function FadeUpBoxDropDown({ id, profile }) {
  
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin-logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        localStorage.removeItem("authToken");
        toast.success("Logout successful!");
        setTimeout(() => {
          router.push("/admin_login");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast.error("Failed to logout.");
      });
    setOpen(false);
  };

  return (
    <div ref={dropDownRef} className="relative z-40 text-white">
      <div onClick={() => setOpen((prev) => !prev)} className="">
      
           <RiUserSettingsLine className=" text-[#830e70] text-[2.4rem] cursor-pointer " />

        
      </div>
      <ul
        className={`${
          open ? "visible" : "invisible"
        } absolute right-0 top-20 z-50 w-[10rem] space-y-1`}
      >
        {profile ? (
          <Link href={`/admin_dashboard/${id}`}>
            <li
              className={`  rounded-sm bg-[#830e70] p-2 ${
                open ? "opacity-100 duration-500" : "opacity-0 duration-150"
              } cursor-pointer w-full hover:bg-[#611b55]`}
              style={{ transform: `translateY(${open ? 0 : (0 + 1) * 10}px)` }}
            >
              Dashboard
              {/* <AdminProfileModal /> */}
            </li>
          </Link>
        ) : (
          <Link href={`/admin_dashboard/${id}/profile`}>
            <li
              className={`  rounded-sm bg-[#830e70] p-2 ${
                open ? "opacity-100 duration-500" : "opacity-0 duration-150"
              } cursor-pointer w-full hover:bg-[#611b55]`}
              style={{ transform: `translateY(${open ? 0 : (0 + 1) * 10}px)` }}
            >
              Profile
              {/* <AdminProfileModal /> */}
            </li>
          </Link>
        )}
        <li
          onClick={handleLogout}
          className={`rounded-sm bg-[#830e70] p-2 ${
            open ? "opacity-100 duration-500" : "opacity-0 duration-150"
          } flex items-center justify-between cursor-pointer hover:bg-[#611b55]`}
          style={{ transform: `translateY(${open ? 0 : (1 + 1) * 10}px)` }}
        >
          <span>Log Out</span>
          <IoIosLogOut className=" text-[1.4rem] " />
        </li>
      </ul>
    </div>
  );
}
