import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://xn--kgbei0hva.com/api",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include"
});

// Attach token from localStorage or cookie
apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Token ${token}`;
            }
        } catch (error) {
            console.warn("Failed to access localStorage:", error);
        }
    }
    return config;
});

// Global error handler
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired → redirect or clear session
            if (typeof window !== "undefined") {
                try {
                    localStorage.removeItem("token");
                } catch (e) {
                    console.warn("Failed to clear token from localStorage:", e);
                }
                // window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
