import { createContext, useContext, useEffect, useState } from "react";
import { getMe, signOut as signOutApi } from "./services/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // on app load check if user is already logged in
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await signOutApi();
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;