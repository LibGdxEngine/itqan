import apiClient from "./client";

export const login = async (email, password) => {
    const { data } = await apiClient.post("/auth/login/", { email, password });
    localStorage.setItem("token", data.token);
    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};
