import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import inter from "@/lib/font/Inter";




interface prop{
  icon:string,
  label : string
}


export default function PropertyDashboard() {
  return (
    <div className="flex flex-col min-h-screen w-full mb-20  bg-[#CDE4F9]">
      {/* Header */}
    
   

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 ">
    <h1 className={`text-2xl ${inter.className} font-bold text-gray-600 flex items-center`}>User Dashboard <ChevronRightIcon/></h1>
        {/* City Selector */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Select City</label>
          <Select>
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Not selected" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nagpur">Nagpur</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Image */}
        <div className="rounded-2xl overflow-hidden flex items-center justify-center mb-4">
          <Image
            src="/image/image-2.jpg"
            alt="Property"
            width={400}
            height={200}
            className="w-full h-48 md:h-96 md:w-[40rem] md:rounded-2xl shadow-md  object-cover"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link href={"/dashboard/user/propertyai"} >
          <FeatureCard icon={"spark"} label="AI Match Property" />
          </Link>
          <Link href={"/dashboard/user/find-property/filter-property"}> 
          <FeatureCard icon={"Find"} label="Find Property" />
          </Link>
           <FeatureCard icon={"law"} label="Refer Pro" />
          <FeatureCard icon={"law"} label="Wishlist" />
          <FeatureCard icon={"safe"} label="Verify your Property" />
         
        </div>
      </div>

      {/* Bottom Navbar */}
     
    </div>
  );
}

function FeatureCard({ icon, label }:prop) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md py-6 hover:scale-105 transition-transform">
    <img className="h-10" src={`/image/${icon}.png`} alt="" />
      <p className="text-sm font-medium mt-2 text-center">{label}</p>
      {icon == "safe" ? <p className="text-xs text-gray-400" >coming soon</p>:"" }
    </div>
  );
}
