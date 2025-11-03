import React, { useState, useEffect ,JSX } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import axios from "axios";
import { ChevronRightIcon, User, Handshake, UserPlus } from "lucide-react";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function AdminDashboard() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [Count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!BASE_URL) return;
      try {
        const response = await axios.get(`${BASE_URL}/api/partner/getAllProperties`);
        setCount(response?.data?.count ?? 0);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      }
    };
    fetchProperties();
  }, [BASE_URL]);
 
  return (
    <div className={`${inter.className} flex flex-col h-screen bg-[#CDE4F9]`}>
      {/* Header */}
    
   

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
    <h1 className={`text-2xl ${inter.className} font-bold text-gray-600 flex items-center mb-2 mt-2`}>Admin Dashboard <ChevronRightIcon/></h1>
        {/* City Selector */}
    
     
     <div className="flex items-center justify-center p-2 gap-1 bg-white mb-2 rounded-2xl">
         <button className="bg-white p-2 w-1/2 rounded-2xl border-2 ">Auto</button>
            <button className=" p-2 w-1/2 rounded-2xl bg-[#CDE4F9]  border-2">Manual</button>
     </div>

 
        {/* Property Image */}
        <div className="rounded-2xl flex gap-2 p-2 flex-col bg-white  overflow-hidden border-2 mb-4">
            <h1 className= {`${inter.className} font-semibold flex items-center   `}>Pending Request <ChevronRightIcon/> </h1>
            <div className="flex items-center justify-center gap-2 w-full">
             <div className="h-20 w-1/2 flex items-center justify-center flex-col rounded-2xl bg-[#CDE4F9]">
                    <h1 className="font-bold text-2xl text-gray-700">3</h1>
                   <h1>
                     User Pending
                    </h1>
             </div>
           <div className="h-20 w-1/2 flex items-center justify-center flex-col rounded-2xl bg-[#CDE4F9]">
                   <h1 className="font-bold text-2xl text-gray-700">{Count}</h1>
                   <h1>
                     Partner Pending
                    </h1>
             </div>

            </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link href={"/dashboard/admin/booking-approval"} >
          <FeatureCard index={0}  label=" User Pending Request" />
          </Link>
          <Link href={"/dashboard/admin/property-approval"}> 
          <FeatureCard index={1} label=" Partner Pending Request" />
          </Link>

           <Link href={"/dashboard/admin/refer-approval"}> 
          <FeatureCard index={2} label="Customer Lead Request" />
          </Link>
        
         
        </div>
      </div>

      {/* Bottom Navbar */}
     
    </div>
  );
}

interface FeatureCardProps {
    index: number;
    label: string;
}

function FeatureCard({ index, label }: FeatureCardProps) {
    const [Icon] = useState<JSX.Element[]>([
        <User key="user-icon" size={50} color="#2396C6" />,
        <Handshake key="handshake-icon" size={50} color="#2396C6" />,
        <UserPlus  key="userplus-icon" size={50} color="#2396C6"/>
    ]);

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md py-6 hover:scale-105 transition-transform">
            {Icon[index]}
            <p className={`${inter.className} text-sm font-medium mt-2 text-center`}>{label}</p>
        </div>
    );
}
