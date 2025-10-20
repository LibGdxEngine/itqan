"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {useUser} from "@/app/hooks/useUser";

export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const { user, loading, error } = useUser();

    useEffect(() => {
        if (loading) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [loading]);

    useEffect(() => {
        if (!loading && (!user || error)) {
            router.replace("/login");
        }
    }, [loading, user, error, router]);

    if (loading || (!user && !error)) {
        // While checking user status — show progress or loader
        return (
            <div className="w-screen flex justify-center items-center h-screen">
                {/*<p className="text-center text-gray-500">جاري التحميل ...</p>*/}
            </div>
        );
    }

    // Authenticated users see the children
    return <>{children}</>;
}
