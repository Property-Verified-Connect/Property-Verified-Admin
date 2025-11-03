"use client"
import React, { useEffect ,useState } from 'react'
import Image  from 'next/image'
import { Bell } from 'lucide-react'
import { Inter } from 'next/font/google'
import Link from 'next/link'


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

function Nav() {
   const [user, setUser] = useState();
   useEffect(() => {
        const storedUser = localStorage.getItem("userdata");
        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);
        }
    }, []);
  return (
    <div className='h-12 fixed top-0 md:gap-0 gap-25   z-99 w-full md:p-4 px-2 bg-white shadow flex items-center justify-between'>
          <div className='h-10 w-50 flex items-center justify-center'>
           
        <Image src={'/image/Logo.png'} height={120} width={100} alt='logo'/>
          </div>

<div className={`${inter.className}  font-medium text-gray-600  md:flex items-center justify-center gap-10 pr-2 md:pr-20`}>
     <div className=' md:flex gap-10 hidden  '>
      <Link  href={"/"}>
       <h1  >Home</h1>
      </Link>
        <Link href={"/dashboard/user"}>
       <h1>Menu</h1>
      </Link>
       <h1>Order</h1>
     </div>
     <div className='flex gap-10 items-center '>
      <Bell/>


<div className='h-10 w-10 bg-[#2396C6] text-white  flex items-center justify-center  border-2  rounded-full'>
       <h1>
          {user?.name.slice(0,1)}
       </h1>
</div>

     </div>


</div>
        


    </div>
  )
}

export default Nav