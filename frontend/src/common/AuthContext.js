import { createContext, useState, useEffect } from 'react';
import { useFetchCurrentUserQuery } from '../store/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { data: user, isFetching, isSuccess } = useFetchCurrentUserQuery();

    useEffect(() => {
        const userExists = user && user.id && !isFetching && isSuccess;
        setIsAuthenticated(userExists);
    }, [user, isFetching, isSuccess]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
