"use client";

import inter from '@/lib/font/Inter'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

interface User {
    name?: string;
    contact?: string;
    email?: string;
    city?: string;
    role?: string;
 
   
}

const UserProfile: React.FC = () => {
    const router = useRouter();
    const BASEURL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
    const [user, setUser] = useState<User | null>(null);

    const logout = async (): Promise<void> => {
        try {
            await fetch(`${BASEURL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            localStorage.clear();
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("userdata");
        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);
        }
    }, []);

    return (
        <div
            className={`${inter.className} text-2xl text-gray-500 flex items-center bg-[#CDE4F9] justify-start flex-col font-bold  h-screen w-full pt-10 `}
        >
            <div className='h-32 w-full flex flex-col items-center justify-center '>
                <div className='h-24 w-24 rounded-full bg-white border-2 p-2 overflow-hidden'>
                    <img className='h-full w-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0a0iDtUPUzs0GFM6DSuovK0uOE4-Sc40Pg&s" alt="" />
                </div>
                <h1 className='text-xl'>{user?.name}</h1>
            </div>

            <div className='h-40 w-[90%] flex flex-col items-center justify-center bg-white border-2  rounded-2xl shadow-2xl '>
                <h2 className='text-sm'> Phone :  {user?.contact}</h2>
                <h2 className='text-sm'> Email :  {user?.email}</h2>
                <h2 className='text-sm'> City : {user?.city} </h2>
                <h2 className='text-sm capitalize'> Role : {user?.role} </h2>
            </div>

            <Button onClick={logout} className=' w-[40%] mt-10 bg-red-500 '>
                Log Out
            </Button>
        </div>
    )
}

export default UserProfile