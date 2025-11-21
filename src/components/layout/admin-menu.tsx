import React, { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import axios from "axios";
import { ChevronRightIcon, User, Handshake, UserPlus } from "lucide-react";
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
    const fetchAutomationFlag = async () => {
      if (!BASE_URL) return;
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/getFlagValue`);
        const flagValue = response?.data?.flag?.value;
        console.log(response?.data)
        if (flagValue === "auto" || flagValue === "manual") {
          setAutomationMode(flagValue);
        }
      } catch (error) {
        console.error("Failed to fetch automation flag", error);
      }
    };
    fetchAutomationFlag();
  }, [BASE_URL]);

  const handleModeClick = (mode: "auto" | "manual") => {
    if (mode === automationMode) return;
    setPendingMode(mode);
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingMode || !BASE_URL) return;

    setIsLoading(true);
    try {
      const endpoint = pendingMode === "auto"
        ? `${BASE_URL}/api/admin/Change_toAuto`
        : `${BASE_URL}/api/admin/Change_toManual`;

      await axios.put(endpoint);
      setAutomationMode(pendingMode);
    } catch (error) {
      console.error("Failed to change automation mode", error);
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
      setPendingMode(null);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingMode(null);
  };

  return (
    <div className={`${inter.className} flex flex-col h-screen bg-[#CDE4F9]`}>
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <h1 className={`text-2xl ${inter.className} font-bold text-gray-600 flex items-center mb-2 mt-2`}>
          Admin Dashboard <ChevronRightIcon />
        </h1>

        {/* Mode Toggle */}
        <div className="flex items-center justify-center p-2 gap-1 bg-white mb-2 rounded-2xl">
          <button
            onClick={() => handleModeClick("auto")}
            disabled={isLoading}
            className={`p-2 w-1/2 rounded-2xl border-2 transition-colors ${
              automationMode === "auto"
                ? "bg-[#CDE4F9] border-[#2396C6]"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => handleModeClick("manual")}
            disabled={isLoading}
            className={`p-2 w-1/2 rounded-2xl border-2 transition-colors ${
              automationMode === "manual"
                ? "bg-[#CDE4F9] border-[#2396C6]"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            Manual
          </button>
        </div>

        {/* Property Image */}
        <div className="rounded-2xl flex gap-2 p-2 flex-col bg-white overflow-hidden border-2 mb-4">
          <h1 className={`${inter.className} font-semibold flex items-center`}>
            Pending Request <ChevronRightIcon />
          </h1>
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="h-20 w-1/2 flex items-center justify-center flex-col rounded-2xl bg-[#CDE4F9]">
              <h1 className="font-bold text-2xl text-gray-700">3</h1>
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
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50" />
          <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Are you sure?</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-2">
                You are about to change the automation mode to{" "}
                <span className="font-semibold capitalize">{pendingMode}</span>.
                This will affect how the system processes requests.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleConfirm} disabled={isLoading}>
                {isLoading ? "Updating..." : "Confirm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
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
  ]);

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md py-6 hover:scale-105 transition-transform">
      {Icon[index]}
      <p className={`${inter.className} text-sm font-medium mt-2 text-center`}>{label}</p>
    </div>
  );
}