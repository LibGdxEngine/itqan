import { useApi } from "./useApi";
import { ENDPOINTS } from "../lib/api/endpoints";

export const useUser = () => {
    const { data, error, loading } = useApi(ENDPOINTS.USER.PROFILE);
    return { user: data, error, loading };
};
