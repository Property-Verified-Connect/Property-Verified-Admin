"use client"
import React, { useState ,JSX } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

type FormData = {
  name: string;
  email: string;
  contact: string;
  city: string;
  password: string;
  confirmPassword: string;
  role: string;
  terms: boolean;
};

type Errors = Record<string, string>;

export default function SignInForm(): JSX.Element {
   
     
   const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    city: "",
    password: "",
    confirmPassword: "",
    role: "user",
    terms: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const BASEURL = process.env.NEXT_PUBLIC_API_URL


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "You must accept terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post<{ message: string }>(
          `${BASEURL}/api/auth/signup`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            contact: formData.contact,
            city: formData.city,
            role: formData.role,
          },
          { withCredentials: true }
        );

        alert(res.data.message);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          // attempt to read server error message
          const serverMsg = (err.response.data as { error?: string })?.error ?? err.message;
          alert(serverMsg);
          router.push("/auth/login")

        } else {
          alert(String(err));
        }
      }
      // Reset form if needed
      // setFormData({ name: "", email: "", contact: "", city: "", password: "", confirmPassword: "", terms: false, role: "user" });
    }
  };

  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-6  w-94 md:w-[29rem] bg-white rounded-lg shadow-md">
     
     <div className="h-20 w-60  m-auto flex items-center justify-center">
       <Image src="/image/Logo.png" alt="logo" width={140} height={100}  className="  scale-140" ></Image>
     </div>
   <div className={`${inter.className} flex items-center justify-center flex-col`}>
      <h2 className={`${inter.className} text-[#247FBA] text-2xl font-bold mb-6 text-center`}>Sign Up</h2>
       <p className="-mt-6 text-xs font-bold text-center  text-gray-400 mb-3">Create an Account <br /> And Connect with your interested  verified property </p>
   </div>
      <form onSubmit={handleSubmit} className={`${inter.className} space-y-4 `}>
 
        {/* Name */}
        <div className=" flex items-center justify-between gap-3">
        <div>
          <Label htmlFor="name" className="mb-2 text-[#247FBA]">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2 text-[#247FBA]">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        </div>

        {/* Contact */}
        <div className="flex items-center justify-between gap-3">
        <div>
          <Label htmlFor="contact" className="mb-2 text-[#247FBA]">Contact</Label>
          <Input
            id="contact"
            name="contact"
            type="tel"
            placeholder="Enter Contact No."
            value={formData.contact}
            onChange={handleChange}
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
        </div>

        {/* Select City */}
        <div>
          <Label htmlFor="city" className="mb-2 text-[#247FBA]">Select City</Label>
          <Select
            value={formData.city}
            onValueChange={(value: string) => setFormData((prev) => ({ ...prev, city: value }))}
          >
            <SelectTrigger className="w-48"  >
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="Nagpur">Nagpur</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>


        </div>
       

        {/* Password */}
        <div>
          <Label htmlFor="password" className="mb-2 text-[#247FBA]">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Re-enter Password */}
        <div>
          <Label htmlFor="confirmPassword" className="mb-2 text-[#247FBA]">Re-enter Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center space-x-2">
         <Checkbox
    id="terms"
    checked={formData.terms}
    onCheckedChange={(checked: boolean) =>
      setFormData((prev) => ({ ...prev, terms: checked }))
    }
  />
          <Label htmlFor="terms" className="text-[#247FBA]">I agree to the Terms & Conditions</Label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4 bg-[#247FBA] hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA] ">
          Sign Up
        </Button>
      </form>
        <p className="mt-1 text-xs font-bold text-center text-gray-400  ">Aleady have the Account  , <Link href={"/auth/login"}> <span className="hover:underline">Login</span> </Link>  </p>
    </div>
  );
}
