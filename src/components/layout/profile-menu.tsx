import React , {JSX} from "react";

import { Building2, Flame, UserRound, ChevronRightIcon } from "lucide-react";

import Link from "next/link";
import { Inter } from "next/font/google";
import MobileHighgraph from "../shared/graph";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface prop {
  index: number;
  label: string;
}

export default function PartnerDashboard(): JSX.Element {
  return (
    <div className="w-full py-13 flex flex-col min-h-screen bg-[#CDE4F9]">
      {/* Header */}

      {/* Content */}
      <div className="flex-1  px-3 py-3 min-h-screen">
        <h1 className={`text-2xl ${inter.className} font-bold text-gray-600 flex items-center`}>
          Partner Dashboard <ChevronRightIcon />
        </h1>

        {/* Property Image */}
        <MobileHighgraph />

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Link href={"/dashboard/partner/property-listing"}>
            <FeatureCard index={0} label="Property Listing" />
          </Link>
          <Link href={"/dashboard/partner/lead-received"}>
            <FeatureCard index={1} label="Lead Received" />
          </Link>
          <Link href={"/dashboard/partner/hot-leads"}>
            <FeatureCard index={2} label="Refer Hot Leads" />
          </Link>
        </div>
      </div>

      {/* Bottom Navbar */}
    </div>
  );
}

function FeatureCard({ index, label }: prop): JSX.Element {
  const Icon: JSX.Element[] = [
    <Building2 key={1} size={50} color="#2396C6" />,
    <UserRound key={2} size={50} color="#2396C6" />,
    <Flame key={3} size={50} fill="#2396C6" color="#2396C6" />,
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md py-6 hover:scale-105 transition-transform">
      {Icon[index]}
      <p className={`${inter.className} text-sm font-medium mt-2 text-center`}>{label}</p>
    </div>
  );
}
