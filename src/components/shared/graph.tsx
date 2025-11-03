"use client";
import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function MobileHighgraph() {
  const containerRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(320);

  // Dropdown filter states
  const [month, setMonth] = useState("All Months");
  const [year, setYear] = useState("2025");

  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2023", "2024", "2025"];

  // Responsive chart height
  useEffect(() => {
    const setResponsiveHeight = () => {
      const width = window.innerWidth;
      if (width <= 360) setChartHeight(300);
      else if (width <= 420) setChartHeight(340);
      else if (width <= 640) setChartHeight(380);
      else setChartHeight(420);
    };
    setResponsiveHeight();
    window.addEventListener("resize", setResponsiveHeight);
    return () => window.removeEventListener("resize", setResponsiveHeight);
  }, []);

  // Example mock data (Month & Year-wise)
  const sampleData = {
    "2025": {
      "January": [40, 30, 10, 5],
      "February": [35, 25, 8, 4],
      "March": [45, 32, 9, 6],
      "All Months": [120, 87, 27, 15],
    },
    "2024": {
      "January": [30, 20, 6, 3],
      "February": [28, 22, 4, 2],
      "March": [33, 24, 5, 4],
      "All Months": [95, 66, 18, 9],
    },
  };

  const categories = ["New Leads", "Booked", "Cancelled", "Registry Done"];

  const data =
    sampleData[year]?.[month] || sampleData[year]?.["All Months"] || [0, 0, 0, 0];

  const options = {
    chart: {
      type: "column",
      height: chartHeight,
      backgroundColor: null,
      spacing: [8, 8, 8, 8],
    },
    title: {
      text: `Analytics - ${month}, ${year}`,
      align: "left",
      style: { fontSize: "14px", fontWeight: 600 },
    },
    xAxis: {
      categories,
      labels: { style: { fontSize: "11px" } },
      tickLength: 0,
    },
    yAxis: {
      title: { text: null },
      labels: { style: { fontSize: "11px" } },
      gridLineDashStyle: "ShortDash",
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(255,255,255,0.95)",
      borderRadius: 8,
      shadow: true,
    },
    legend: { enabled: false },
    credits: { enabled: false },
    series: [
      {
        name: "Count",
        data,
        color: "#2396C6",
        borderColor: "#2396C6",
      },
    ],
  };

  return (
    <div className="py-3   mt-3 max-w-md mx-auto" ref={containerRef}>
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-3 gap-2">
        {/* Month Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-[#2396C6] border-[#2396C6] hover:bg-[#2396C6] hover:text-white flex items-center gap-1"
            >
              {month} <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto">
            {months.map((m) => (
              <DropdownMenuItem key={m} onClick={() => setMonth(m)}>
                {m}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Year Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-[#2396C6] border-[#2396C6] hover:bg-[#2396C6] hover:text-white flex items-center gap-1"
            >
              {year} <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {years.map((y) => (
              <DropdownMenuItem key={y} onClick={() => setYear(y)}>
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart Section */}
      <div className="bg-white/90 dark:bg-slate-900/80 p-2 w-full rounded-2xl shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
