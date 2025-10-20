import apiClient from "./client";

export const login = async (email, password) => {
    const { data } = await apiClient.post("/auth/login/", { email, password });
    localStorage.setItem("token", data.token);
    document.cookie = `token=${data.token}; path=/; secure; SameSite=Lax;`;
    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.href = "/login";
};
