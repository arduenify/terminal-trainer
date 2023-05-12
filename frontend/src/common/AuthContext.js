import { createContext, useState, useEffect } from 'react';
import { useFetchCurrentUserQuery } from '../store/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { data: user, isFetching, isSuccess } = useFetchCurrentUserQuery();

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const userExists = user && user.id && !isFetching && isSuccess;
        setIsAuthenticated(userExists);

        if (userExists) {
            const admin = user.role === 'admin';
            setIsAdmin(admin);
        }
    }, [user, isFetching, isSuccess]);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, isAdmin, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
