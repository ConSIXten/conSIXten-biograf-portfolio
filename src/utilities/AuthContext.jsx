import { useState, useEffect } from 'react';
import { AuthContext } from './authContext';
import { registerUser, loginUser } from './cinemaApi';

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const loggedInUser = localStorage.getItem('currentUser');
        if (loggedInUser) {
            setCurrentUser(JSON.parse(loggedInUser));
        }
        setIsLoading(false);
    }, []);

    // Register new user (supports both email or username as name)
    const register = async (username, password, email = null) => {
        try {
            // Use email if provided, otherwise use username as both name and email
            const name = username;
            const userEmail = email || `${username}@biograf.local`;

            const result = await registerUser(name, userEmail, password);

            if (result.success) {
                // Log in the new user automatically
                const userToStore = {
                    id: result.user_id,
                    name: name,
                    email: userEmail
                };
                setCurrentUser(userToStore);
                localStorage.setItem('currentUser', JSON.stringify(userToStore));
            }

            return result;
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Registration failed. Please try again.' };
        }
    };

    // Login existing user (supports both email or username)
    const login = async (username, password) => {
        try {
            // Try logging in with email format
            const email = username.includes('@') ? username : `${username}@biograf.local`;
            const result = await loginUser(email, password);

            if (result.success) {
                // Store user data
                const userToStore = {
                    id: result.data.id,
                    name: result.data.name,
                    email: result.data.email
                };
                setCurrentUser(userToStore);
                localStorage.setItem('currentUser', JSON.stringify(userToStore));
            }

            return result;
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    };

    // Logout user
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const value = {
        currentUser,
        isLoading,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
