

import {useApi} from "@/app/hooks/useApi";
import {ENDPOINTS} from "@/app/lib/api/endpoints";

export const useMyCourses = () => {
    console.log("Endpoint:", ENDPOINTS.COURSES.MY_COURSES); // Check if this is correct
    const { data, error, loading } = useApi(ENDPOINTS.COURSES.MY_COURSES);

    console.log("Raw data:", data); // See the actual API response
    console.log("Courses:", data?.results);

    return {
        courses: data?.results || [], // Each item = Purchase object
        total: data?.count || 0,
        loading,
        error,
    };
};
