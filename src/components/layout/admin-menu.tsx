import React, { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import axios from "axios";
import { ChevronRightIcon, User, Handshake, UserPlus, BlocksIcon, UserRoundX } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function AdminDashboard() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [Count, setCount] = useState<number | null>(null);
   const [Countuser, setCountuser] = useState<number | null>(null);
  const [automationMode, setAutomationMode] = useState<"auto" | "manual">("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<"auto" | "manual" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetch current automation flag on mount
 useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/getBookingforApproval`
        );
       setCountuser(response.data.booking.length)
      } catch (err) {
        console.error("Failed to fetch properties", err);
       
      } finally {
         console.log("done")
      }
    };
    fetchProperties();
  }, []);


 




 

  return (
    <div className={`${inter.className} flex flex-col pb-25 md:items-center md:justify-center w-full h-screen bg-[#CDE4F9]`}>
      {/* Content */}
      <div className="flex-1  px-4 py-3  ">
        <h1 className={`text-2xl ${inter.className} font-bold text-gray-600 flex items-center mb-2 mt-2`}>
          Admin Dashboard <ChevronRightIcon />
        </h1>

        {/* Mode Toggle */}
      

        {/* Property Image */}
        <div className="rounded-2xl flex gap-2 p-2 flex-col bg-white overflow-hidden border-2 mb-4">
          <h1 className={`${inter.className} font-semibold flex items-center`}>
            Pending Request <ChevronRightIcon />
          </h1>
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="h-20 w-1/2 flex items-center justify-center flex-col rounded-2xl bg-[#CDE4F9]">
              <h1 className="font-bold text-2xl text-gray-700">{Countuser}</h1>
              <h1>User Pending</h1>
            </div>
            <div className="h-20 w-1/2 flex items-center justify-center flex-col rounded-2xl bg-[#CDE4F9]">
              <h1 className="font-bold text-2xl text-gray-700">{Count}</h1>
              <h1>Partner Pending</h1>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link href={"/dashboard/admin/booking-approval"}>
            <FeatureCard index={0} label="User Pending Request" />
          </Link>
          <Link href={"/dashboard/admin/property-approval"}>
            <FeatureCard index={1} label="Partner Pending Request" />
          </Link>
          <Link href={"/dashboard/admin/refer-approval"}>
            <FeatureCard index={2} label="Customer Lead Request" />
          </Link>
            <Link href={"/dashboard/admin/suspicious-partner"}>
            <FeatureCard index={3} label="Suspicious  Partner Listing " />
          </Link>
        </div>
      </div>

      {/* Confirmation Dialog */}
   
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
    <UserPlus key="userplus-icon" size={50} color="#2396C6" />,
    <UserRoundX key="block-icon" size={50} color="#2396C6" />,
  ]);

  return (
    <div className="flex flex-col p-3 items-center justify-center bg-white rounded-2xl shadow-md py-6 hover:scale-105 transition-transform">
      {Icon[index]}
      <p className={`${inter.className} text-sm font-medium mt-2 text-center`}> {label}</p>
    </div>
  );
}