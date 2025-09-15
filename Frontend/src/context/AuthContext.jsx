import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const navigate = useNavigate();

    const login = async (credentials) => {
        const { token } = await api.login(credentials);
        localStorage.setItem('authToken', token);
        setToken(token);
        navigate('/notes');
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        navigate('/login');
    };

    const value = { token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);