"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function useRedirectByRole() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      try {
        if (!localStorage.getItem("userdata")) {
          const res = await axios.get(`${BASEURL}/api/user/profile`, {
            withCredentials: true,
          });
          console.log("Fetched user:", res.data);
          localStorage.setItem("userdata", JSON.stringify(res.data));
        }

        // let roleData = null;
        // try {
        //   const userData = localStorage.getItem("userdata");
        //   roleData = userData ? JSON.parse(userData) : null;
        // } catch {
        //   localStorage.removeItem("userdata");
        //   router.replace("/auth/login");
        //   return;
        // }

        // if (!roleData?.role) {
        //   router.replace("/auth/login");
        //   return;
        // }

        // switch (roleData.role) {
        //   case "user":
        //     router.replace("/dashboard/user");
        //     break;
        //   case "partner":
        //     router.replace("/dashboard/partner");
        //     break;
        //   case "admin":
        //     router.replace("/dashboard/admin");
        //     break;
        //   default:
        //     router.replace("/auth/login");
        //     break;
        // }
      } catch (err: unknown) {
        console.error("Error checking role:", err);
        router.replace("/auth/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [router, BASEURL]); // ✅ Added BASEURL

  return loading;
}
