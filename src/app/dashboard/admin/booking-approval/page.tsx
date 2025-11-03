"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import inter from "@/lib/font/Inter";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";
import Link from "next/link";

import Nav from "@/components/layout/nav";
import { Skeleton } from "@/components/ui/skeleton";

import BookingCards from "@/components/shared/booking-card";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface Property {
  id: string;
  approved_property_id: {
    photos: string;
    property_type: string;
    user_id: {
      name: string;
    };
    price: number;
  };
  user_id: {
    name: string;
  };
  config: string;
}

function Page() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/getBookingforApproval`
        );
        // Set properties from response; adapt the path to your API shape if needed
        setProperties(response.data.booking ?? response.data ?? []);
      } catch (err) {
        console.error("Failed to fetch properties", err);
        setProperties([]);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    console.log(properties);
  });

  return (
    <div>
      <Nav />
      <div className="min-h-screen w-full overflow-hidden bg-[#CDE4F9] py-17 px-4 flex items-center justify-start flex-col">
        <div className="flex items-center justify-center gap-1 md:gap-3">
          <Link href={"/dashboard/admin"}>
            <Button variant="outline" className="mb-2  rounded-full">
              <ArrowLeft />
            </Button>
          </Link>

          <div className="flex items-center bg-white rounded-full shadow px-3 w-11/12 max-w-md mb-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by property name or location..."
              className="w-67 md:w-75 px-3 py-2 text-sm outline-none bg-transparent"
            />
          </div>
        </div>
        <div className="  py-2 px-5 md:-ml-20 flex items-start  w-96 ">
          <h1
            className={`${inter.className} font-bold text-gray-600 text-2xl     flex items-center justify-center mb-2 `}
          >
            User Booking Request <ChevronRight />
          </h1>
        </div>

        <div className="h-full w-96 px-3.5 flex flex-col gap-2">
          {properties.length > 0 ? (
            properties.map((p, i) => (
              <BookingCards key={i} property={p} type={"admin"} />
            ))
          ) : (
            // Fallback: show a few placeholders or a message
            <>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
