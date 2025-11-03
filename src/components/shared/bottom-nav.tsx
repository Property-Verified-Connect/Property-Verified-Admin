"use client";

import type { ReactNode } from "react";
import { User2, Home, ClipboardList } from "lucide-react";

export type ActiveTab = "Home" | "Profile" | "Menu" | "Order";

type BottomNavProps = {
  active: ActiveTab;
  setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
  type?: "other" | "user";
};

type NavItem = {
  id: ActiveTab;
  label: string;
  icon: ReactNode;
};

export default function BottomNav({ active, setActive, type }: BottomNavProps) {
  const userItems: NavItem[] = [
    { id: "Menu", label: "Order", icon: <ClipboardList className="h-5 w-5" /> },
    { id: "Home", label: "Home", icon: <Home className="h-5 w-5" /> },
    { id: "Profile", label: "Profile", icon: <User2 className="h-5 w-5" /> },
  ];

  const otherItems: NavItem[] = [
    { id: "Home", label: "Home", icon: <Home className="h-5 w-5" /> },
    { id: "Profile", label: "Profile", icon: <User2 className="h-5 w-5" /> },
  ];

  const items = type === "other" ? otherItems : userItems;

  return (
    <div className="fixed flex md:hidden bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-700 dark:bg-neutral-900 rounded-2xl shadow-md justify-around py-3">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="relative flex flex-col items-center gap-1 text-sm font-medium"
          >
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-white shadow-sm p-3 -mt-3 text-[#2563eb]"
                  : "p-2 text-white"
              }`}
            >
              {item.icon}
            </div>

            <span className={`text-xs capitalize transition-all text-white`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
