import { useEffect, useState } from "react";
import apiClient from "../lib/api/client";

export const useApi = (endpoint, options = {}, deps = []) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    useEffect(() => {
        if (!mounted) return;
        
        let cancel = false;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiClient(endpoint, options);
                if (!cancel) setData(response.data);
            } catch (err) {
                if (!cancel) setError(err);
            } finally {
                if (!cancel) setLoading(false);
            }
        };
        fetchData();
        return () => {
            cancel = true;
        };
    }, [mounted, endpoint, ...deps]);

    return { data, error, loading };
};
