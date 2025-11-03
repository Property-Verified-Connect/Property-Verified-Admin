"use client";
import React from "react";
import { Inter } from "next/font/google";
import { HomeIcon, MessageSquare, PieChart, User, GiftIcon, Building2 } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function AssistantOptions() {
  

  return (
          <div className={` ${inter.className} w-full h-full flex flex-col items-center justify-center `}>
                    <h1 className="font-bold text-3xl md:text-4xl mb-8">What can I help With ?</h1>

                    <div className="md:w-[26rem] w-[100%]  h-40 gap-2 flex flex-wrap items-center justify-center ">
                        
                        <div className=" p-3 rounded-full gap-1   flex items-center text-[11px] md:text-sm justify-center w-fit border-2 border-dashed">
                        <HomeIcon size={20} />  View Properties with AI
                        </div>
                            <div className="p-3 rounded-full gap-1   w-fit border-2 border-dashed  text-[11px] md:text-sm  flex items-center justify-center">
                          <PieChart size={20}/> Budget Analysis
                        </div>
                            <div className="p-3 w-fit rounded-full gap-1   border-2 border-dashed  text-[11px] md:text-sm  flex items-center justify-center">
                        <User size={20}/>  People’s Category Choice
                        </div>
                            <div className="p-3 w-fit rounded-full gap-1   border-2 border-dashed  text-[11px] md:text-sm  flex items-center justify-center">
                         <GiftIcon size={20}/> Club Buying Offers
                        </div>
                            <div className="p-3 w-fit rounded-full gap-1   border-2 border-dashed   text-[11px] md:text-sm flex items-center justify-center">
                        <Building2 size={20}/>   Rent Solutions (Smart Matching)
                        </div>
                            <div className="p-3 w-fit border-2 border-dashed rounded-full gap-1     text-[11px] md:text-sm flex items-center justify-center">
                       <MessageSquare size={20}/>  AI Discuss
                        </div>
                        
                    </div> 
        </div>
  );
}
