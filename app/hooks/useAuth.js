import { useState } from "react";
import { login, logout } from "../lib/api/auth";

export const useAuth = () => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, password) => {
        const data = await login(email, password);
        setUser(data.user);
        return data;
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return { user, login: handleLogin, logout: handleLogout };
};
