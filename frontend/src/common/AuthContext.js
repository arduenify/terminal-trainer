import { createContext, useState, useEffect } from 'react';
import { useFetchCurrentUserQuery } from '../store/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { data: user, isFetching, isSuccess } = useFetchCurrentUserQuery();

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
            value={{ isAuthenticated, setIsAuthenticated, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
