import { useEffect, useState } from "react";
import apiClient from "../lib/api/client";
import { ENDPOINTS } from "../lib/api/endpoints";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    useEffect(() => {
        if (!mounted) return;
        
        let cancel = false;
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await apiClient(ENDPOINTS.USER.PROFILE);
                if (!cancel) setUser(response.data);
            } catch (err) {
                if (!cancel) setError(err);
            } finally {
                if (!cancel) setLoading(false);
            }
        };
        fetchUser();
        return () => {
            cancel = true;
        };
    }, [mounted]);

    return { user, error, loading };
};
