import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data) => {
    const response = await axios.post(`${API}/auth/login`, data, {
        withCredentials: true,
    });

    return response.data;
};

export const register = async (data) => {
    const response = await axios.post(`${API}/auth/register`, data, {
        withCredentials: true,
    });

    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${API}/auth/logout`, {}, {
        withCredentials: true,
    });

    return response.data;
};