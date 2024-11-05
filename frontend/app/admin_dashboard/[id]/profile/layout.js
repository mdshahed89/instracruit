import Link from 'next/link';
import AdminProfileNav from '../../../Components/AdminProfileNav'
import AdminProfileLeft from '../../../Components/AdminProfileLeft'
import { redirect } from 'next/navigation';

export const metadata = {
  title: "admin profile",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children, params
}) {

    const {id} = params
  console.log("idid");

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
    cache: 'no-store'
  });
let userData;
  if (response.ok) {
    userData = await response.json();
    console.log('data fetched successfully:');
  } else {
    const errorData = await response.json();
    console.error('Error fetching data:', errorData);
    redirect("/admin_login")
  }
  userData = userData?.user

  return (
    <>
        <AdminProfileNav userData = {userData} />

            <div className=' border border-[#830e70] rounded-md mt-10 flex items-center justify-center max-w-[1300px] mx-auto '>
                <AdminProfileLeft id={id} />

          <div className=' w-full h-[780px] overflow-y-scroll  '>
          {children}
          </div>
            </div>
     
      </>
  );
}
