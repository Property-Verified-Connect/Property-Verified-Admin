"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleIcon from "../../public/icons/googleicon";
import inter from "@/lib/font/Inter";
import { CircleCheck } from "lucide-react";

export default function Home() {
  const [showCard, setShowCard] = useState(false);

  // Show card after logo animation
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen container w-full flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      {/* Logo animation */}
      {!showCard && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3.2,
            times: [0, 0.2, 0.8, 1],
            ease: [0.45, 0, 0.55, 1], // smoother easeInOut cubic-bezier
          }}
        >
          <Image
            src="/image/Logo.png"
            height={100}
            width={400}
            alt="logo"
            className="drop-shadow-md"
          />
        </motion.div>
      )}

      {/* Card animation */}
      {showCard && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // smooth “easeOutBack” feel
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-6 w-90 md:w-[30rem] bg-white rounded-2xl shadow-lg">
            {/* Logo inside card */}
            <div className="h-20 w-60 m-auto flex items-center justify-center">
              <Image
                src="/image/Logo.png"
                alt="logo"
                width={140}
                height={100}
                className="scale-140"
              />
            </div>

            {/* Text */}
            <div
              className={`${inter.className} flex items-center justify-center flex-col`}
            >
              <h2
                className={`${inter.className} text-[#247FBA] text-2xl font-bold mb-6 text-center flex items-center justify-center gap-1`}
              >
                Welcome to Property <CircleCheck className="mt-1" />
              </h2>
              <p className="-mt-6 text-xs font-bold text-center text-gray-400 mb-3">
                Login to an account <br />
                to connect with your interested verified property
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center flex-col">
            <Link href={"/auth/sign-in"}>
              <Button
                type="submit"
                className="w-80 mt-4 bg-[#247FBA] transition-all hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA]"
              >
                Sign-in
              </Button>
            </Link>
             
             <Link href={"/auth/login"}>
              <Button
                type="submit"
                className="w-80 mt-4 bg-[#247FBA] transition-all hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA]"
              >
                Login
              </Button>
             </Link>
            </div>

            <hr className="mt-3" />

            <h2
              className={`text-xs ${inter.className} font-bold text-gray-500 text-center mt-2`}
            >
              Or
            </h2>

            <div className="w-full flex items-center justify-center">
              <Button className="w-50 m-auto mt-2 transition-all hover:scale-105 hover:bg-white hover:border-2 bg-white border-2 text-[#247FBA]">
                <GoogleIcon />
                Google Login
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
