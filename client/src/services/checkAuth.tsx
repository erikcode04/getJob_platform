import axios from "axios";
import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuth: boolean;
    loading: boolean;
    reqruiter: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthResponse {
    id: string;
    displayName: string;
    email: string;
    reqruiter: boolean;
    iat: number;
    exp: number;
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [reqruiter, setReqruiter] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await axios.get<AuthResponse>("http://localhost:5000/auth/authenticateToken", {
                    withCredentials: true
                });
                console.log("resStatus", response.status);
                console.log("response.data", response.data.reqruiter);
                if (response.data.reqruiter) {
                    setReqruiter(true);
                }
                if (response.status === 200) {
                    setIsAuth(true);
                  
                } else {
                    setIsAuth(false);
                }
            } catch (err) {
                console.log(err);
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, loading, reqruiter }}>
            {children}
        </AuthContext.Provider>
    );
};