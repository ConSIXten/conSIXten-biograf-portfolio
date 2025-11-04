import { useState, useEffect } from 'react';
import { AuthContext } from './authContext';

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

    // Register new user
    const register = (username, password) => {
        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if username already exists
        if (users.find(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            username,
            password, // In production, this should be hashed!
            createdAt: new Date().toISOString()
        };

        // Save to users array
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Log in the new user
        const userToStore = { id: newUser.id, username: newUser.username };
        setCurrentUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));

        return { success: true, message: 'Registration successful' };
    };

    // Login existing user
    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid username or password' };
        }

        // Store user without password
        const userToStore = { id: user.id, username: user.username };
        setCurrentUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));

        return { success: true, message: 'Login successful' };
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
