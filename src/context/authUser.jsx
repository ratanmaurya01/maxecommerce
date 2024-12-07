import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the logged-in user
            setLoading(false);    // Mark loading as complete
        });

        return () => unsubscribe(); // Cleanup the listener
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {!loading ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};
