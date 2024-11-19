import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/registro`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || "Error en el registro";
    }
};  

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || "Error en el inicio de sesión";
    }
};
