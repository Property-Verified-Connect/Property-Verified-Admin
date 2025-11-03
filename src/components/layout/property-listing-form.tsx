"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {motion} from "framer-motion"
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Textarea } from "../ui/textarea";
import { Upload } from "lucide-react";

interface FormDataType {
  lookingFor: string;
  propertyKind: string;
  propertyType: string;
  bedroom: string | number;
  bathroom: string | number;
  balconies: string | number;
  roomtype: string;
  contact: string;
  Area: string;
  Areaunit: string;
  floor: string;
  ageproperty: string;
  available: string;
  availablefor: string;
  suitablefor: string;
  socialMedia: string;
  description: string;
  photos: FileList | null;  // ✅ FIXED
  location: string;
  price: string;
  city?: string;
}


export default function PropertyForm() {
   
   const [step, setStep] = useState(1);
   const [loading, setloading] = useState(false);
   const router = useRouter();
   const BASEURL = process.env.NEXT_PUBLIC_API_URL;


  const [formData, setFormData] = useState <FormDataType>({
    lookingFor: "",
    propertyKind: "",
    propertyType: "",
    bedroom: "",
     bathroom: "",
     balconies:"",
     roomtype:"",
     contact: "",
     Area:"",
     Areaunit:"",
     floor:"",
     ageproperty:"",
     available:"",
     availablefor:"",
    suitablefor:"",
    socialMedia:"",
  description:"",
     photos: null,
    location: "",
    price: "",
    
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);
  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, photos: e.target.files as FileList });
    };



const handleSubmit = async () => {
  
   setloading(true)
  
  try {
    const fd = new FormData();

    // append fields (strings)
  for (const key of [
  'lookingFor','propertyKind','propertyType','contact','city','location',
  'bedroom','bathroom','balconies','roomtype','Area','Areaunit',
  'floor','ageproperty','available','availablefor','suitablefor',
  'socialMedia','price','description'
] as (keyof FormDataType)[]) {    // 👈 Added assertion
  const value = formData[key];
  if (value !== undefined && value !== null) {
    fd.append(key, String(value)); // 👈 Convert to string to satisfy FormData
  }
}


    // append files (input name is 'photos' because server expects that)
    if (formData.photos && formData.photos.length) {
      for (let i = 0; i < formData.photos.length; i++) {
        fd.append('photos', formData.photos[i]); // same field name for each file
      }
    }

    console.log("Printing Form Data" , fd)

    // Get token from wherever you store it (example)
    const token = localStorage.getItem('sb_access_token') || ''; // replace with your storage key

    const response = await axios.post(
      `${BASEURL}/api/partner/insertPropertyinDB`,
      fd,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    alert('✅ Form Submitted Successfully!');
    router.push("/dashboard/partner")
    
    console.log('Response:', response.data);
  } catch (error) {
     if (axios.isAxiosError(error)) {
    console.error("❌ Error submitting form:", error.response ?? error.message);
  } else {
    console.error("❌ Unknown error:", error);
  }
  alert("Something went wrong while submitting the form.");
    alert('Something went wrong while submitting the form.');
  }
};


  return (
    <div className="min-h-screen flex items-start justify-center  px-2 ">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Step {step} of 3
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <motion.div initial={{opacity:0}} animate={{x:10 ,opacity:1}}  className="space-y-6">
              <div>
                <Label className="text-md font-medium">You’re looking to?</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Sell", "Rent / Lease", "Paying Guest"].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.lookingFor === option ? "selectdashed" : "select"
                      }
                      onClick={() => handleChange("lookingFor", option)}
                    size={"sm"}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-md font-medium">
                  What kind of property?
                </Label>
                <div className="flex gap-2 mt-2">
                  {["Residential", "Commercial"].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.propertyKind === option ?  "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("propertyKind", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-md font-medium">
                  Select Property Type
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Apartment",
                    "Independent House / Villa",
                    "Plot / Land",
                    "Farmhouse",
                    "Studio Apartment",
                    "Other",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.propertyType === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("propertyType", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-md font-medium">Your Contact</Label>
                <Input
                  type="text"
                  placeholder="Enter your phone or email"
                  value={formData.contact}
                  onChange={(e) => handleChange("contact", e.target.value)}
                  className="mt-2"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{opacity:0}} animate={{x:10 ,opacity:1}} className="space-y-6">
              <div>
                <Label className="text-md font-medium">
                  Property Location
                </Label>
                <Input
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-md font-medium ">City</Label>
                <Select
                  onValueChange={(value) => handleChange("city", value)}
                  value={formData.city}
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nagpur">Nagpur</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

    <div>
         <Label className="text-md font-medium mb-2 ">Add Room Details </Label>
         <Label className="text-sm font-medium text-gray-600  ">No of Bedrooms </Label>
           <div className="flex flex-wrap gap-2 mt-1 mb-3">
                  {[
                    1,
                    2,
                    3,
                    4,
                    "Other",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.bedroom === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("bedroom", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
         <Label className="text-sm font-medium text-gray-600 ">No of Bathrooms </Label>
           <div className="flex flex-wrap gap-2 mt-1 mb-2">
                  {[
                    1,
                    2,
                    3,
                    4,
                    "Other",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.bathroom === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("bathroom", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <Label className="text-sm font-medium text-gray-600 "> Balconies </Label>
           <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    1,
                    2,
                    3,
                    4,
                    "Other",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.balconies === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("balconies", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                 </div>

<div>
           
           
                 <Label className="text-md font-medium mt-3 ">Room Type </Label>
                 <div className="flex flex-wrap gap-2 mt-1">
                   {[
                   "Shared",
                   "Private"
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.roomtype === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("roomtype", option)}
                    >
                      {option}
                      
                      
                    </Button>
                  ))}
                  </div>


           
</div>


<div >
           
           
                 <Label className="text-md font-medium mt-3 ">Add Area Details </Label>
                 <div className="flex items-center gap-2">
                 <Input
                  placeholder="Plot Area"
                  value={formData.Area}
                  onChange={(e) => handleChange("Area", e.target.value)}
                  className="mt-2 w-40"
                />
                <Select
                  onValueChange={(value) => handleChange("Areaunit", value)}
                  value={formData.Areaunit}
                >
                  <SelectTrigger className="mt-2 w-30">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                   <SelectItem value="sqft">sq.ft</SelectItem>
<SelectItem value="sqyards">sq.yards</SelectItem>
<SelectItem value="sqm">sq.m</SelectItem>
<SelectItem value="acres">acres</SelectItem>
<SelectItem value="marla">marla</SelectItem>
<SelectItem value="cents">cents</SelectItem>
                  </SelectContent>
                </Select>

                 </div>

           
</div>

<div>
    <Label className="text-md font-medium mt-3 ">Floor Detials </Label>
                <p className="text-xs text-gray-400">Total no of floors and your floor details</p> 
                 <Input
                  placeholder="Total Floor"
                  value={formData.floor}
                  onChange={(e) => handleChange("floor", e.target.value)}
                  className="mt-2 w-40"
                />
</div>


<div>
    <Label className="text-md font-medium mt-3 ">Age of Property </Label>
              
                     <div className="flex flex-wrap gap-2 mt-1">
                   {[
                   "0-1 years",
                   "1-5 years",
                   "5-10 years",
                   "10+ years"
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.ageproperty === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("ageproperty", option)}
                    >
                      {option}
                      
                      
                    </Button>
                  ))}
                  </div>

</div>


<div>
    <Label className="text-md font-medium mt-3 ">Available form </Label>
              <Input
                  placeholder="YYYY - MM -DD"
                  value={formData.available }
                  onChange={(e) => handleChange("available", e.target.value)}
                  className="mt-2 w-40"
                />  
                 
</div>


<div>
    <Label className="text-md font-medium mt-3 ">Available for </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                   {[
                   "Girl",
                   "Boys",
                   "Any",
                
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.availablefor === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("availablefor", option)}
                    >
                      {option}
                      
                      
                    </Button>
                  ))}
                  </div>
                 
</div>
<div>
    <Label className="text-md font-medium mt-3 ">suitable For </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                   {[
                   "Student",
                   "Working Professionals",
                   "Both",
                
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.suitablefor === option ?
                        "selectdashed" : "select"
                      }
                       size={"sm"}
                      onClick={() => handleChange("suitablefor", option)}
                    >
                      {option}
                      
                      
                    </Button>
                  ))}
                  </div>
                 
</div>

           
  

            </motion.div>
          )}

           {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <Label>Upload Property Photos</Label>
                <div className="relative">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2 "
                />
                 <div className=" absolute  top-3  left-54">
                  <Upload/> 

                 </div>

                </div>
                
                {formData.photos && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.photos.length} file(s) selected
                  </p>  
                )}
              </div>

              <div>
                <Label>Social Media Link</Label>
                <Input
                  placeholder="https://instagram.com/yourproperty"
                  value={formData.socialMedia}
                  onChange={(e) => handleChange("socialMedia", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Property Price (₹)</Label>
                <Input
                  type="number"
                  placeholder="Enter price in rupees"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Property Description</Label>
                <Textarea
                  placeholder="Describe your property, nearby facilities, and special features..."
                  value={formData.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                  className="mt-2 h-24"
                />
              </div>
            </motion.div>
          )}
        </CardContent>




        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={handlePrev}>
              Back
            </Button>
          )}
          {step < 3 && (
            <Button onClick={handleNext} className="ml-auto">
              Next
            </Button>
          )}
          {step === 3 && (
            <Button onClick={handleSubmit} className="ml-auto w-60">
              {
                loading ? 
                <>
                 <div className="flex items-center justify-center  ">
  <div className="animate-spin rounded-2xl  h-4 w-4 border-b-2 group-hover:border-[#247FBA] border-white"></div>
</div>
 Please wait
                </>
                :
                
               <h1>Submit</h1> 
              }
              
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
