"use client";

import React ,{JSX} from "react";
import useRedirectByRole from "@/hooks/useRedirectByRole";
import MiddlewareLoader from "@/components/shared/middleware-loader";

export default function Page(): JSX.Element | null {
    const loading = useRedirectByRole();

    if (!loading) return null;

    return (
       <MiddlewareLoader/>
    );
}