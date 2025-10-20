import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include"
});

// Attach token from localStorage or cookie
apiClient.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Global error handler
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired → redirect or clear session
            localStorage.removeItem("token");
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
