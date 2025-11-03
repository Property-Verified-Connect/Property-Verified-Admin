import { Inter } from 'next/font/google';
import React from 'react'


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

function MiddlewareLoader() {
  return (
    
 <div
            className="h-screen w-full flex items-center justify-center flex-col"
            role="status"
            aria-live="polite"
        >
            <svg
                className="w-12 h-12 text-[#2396C6] animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            <span className={`mt-4 text-sm text-gray-700 font-bold ${inter.className} `}>Loading...</span>
        </div>


  )
}

export default MiddlewareLoader