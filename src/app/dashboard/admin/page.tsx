"use client";

import useRedirectByRole from "@/hooks/useRedirectByRole";
import { useState } from "react";
import MiddlewareLoader from "@/components/shared/middleware-loader";
import AdminDashboard from "@/components/layout/admin-menu";
import Nav from "@/components/layout/nav";
import BottomNav from "@/components/shared/bottom-nav";
import UserProfile from "@/components/layout/user-profile";


type ActiveTab = "Home" | "Profile"
interface BottomNavProps {
  active: ActiveTab;
  setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
  type: string;
}

export default function Page() {
  const loading = useRedirectByRole();
  const [active, setActive] = useState<ActiveTab>("Home");

  if (loading) {
    return <MiddlewareLoader />;
  }

  return (
    <>
      <Nav />
      <div className="h-screen w-full py-15 bg-[#CDE4F9] flex flex-col">
        {active === "Home" ? <AdminDashboard /> : <UserProfile />}

        {/* ✅ Correct prop typing and spelling */}
        <BottomNav active={active} setActive={setActive} type="other" />
      </div>
    </>
  );
}
