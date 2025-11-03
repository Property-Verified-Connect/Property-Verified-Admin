"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CitySelect({ onCityChange }) {
  const handleCityChange = (value) => {
    if (onCityChange) onCityChange(value)
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <Select onValueChange={handleCityChange}>
        <SelectTrigger className="w-80 bg-white shadow-sm rounded-xl border-2 border-[#abd8ec] focus:ring-2 focus:ring-[#2396C6]">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nagpur">Nagpur</SelectItem>
          <SelectItem value="pune">Pune</SelectItem>
          <SelectItem value="mumbai">Mumbai</SelectItem>
          <SelectItem value="delhi">Delhi</SelectItem>
          <SelectItem value="bangalore">Bangalore</SelectItem>
          <SelectItem value="hyderabad">Hyderabad</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
