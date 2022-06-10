import axios from 'axios';

const baseUrl = 'http://localhost:3030/api';

export const registerUser = async (user) => {
    try {
        const data = await axios.post(`${baseUrl}/users/register`, user);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const loginUser = async (user) => {
    try {
        const data = await axios.post(`${baseUrl}/users/login`, user);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.get(`${baseUrl}/users/me`, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default {
    registerUser,
    loginUser,
    fetchUser
}