import React, { createContext, useState, useContext ,useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase'; // Import Firebase auth instance
import { signOut } from 'firebase/auth';

// Create the context

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const login = (userData) => {
        setUser(userData);
    };
    const logout =async () => {

        try {
            await signOut(auth); 
            setUser(null); 
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
