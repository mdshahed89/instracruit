import React from 'react'
import AccountSetting from '../../../../Components/AccountSetting'

const page = async ({params}) => {

  // const cookieStore = cookies();
  // const token = cookieStore.get("authToken")?.value;


  const {id} = params
  console.log("idid");
  
  console.log(id)
  

  // const data = jwt.decode(token);

  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

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
    <div>
        <AccountSetting  userData ={userData} id={id} />
    </div>
  )
}

export default page