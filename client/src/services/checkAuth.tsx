import axios from "axios";
import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                console.log("Sending request");
                const response = await axios.get("http://localhost:5000/auth/authenticateToken", {
                    withCredentials: true
                });
                console.log(response);
                if (response.status !== 200) {
                    setIsAuth(false);
                } else {
                    setIsAuth(true);
                }
            } catch (err) {
                console.log(err);
                setIsAuth(false);
            }
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};