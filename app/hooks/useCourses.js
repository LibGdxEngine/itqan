

import {useApi} from "@/app/hooks/useApi";
import {ENDPOINTS} from "@/app/lib/api/endpoints";

export const useCourses = () => {
    // useApi returns { data, error, loading }
    const { data, error, loading } = useApi(ENDPOINTS.COURSES.LIST);

    return {
        courses: data?.results || [],   // map Django response
        total: data?.count || 0,
        next: data?.next,
        previous: data?.previous,
        loading,
        error,
    };
};
