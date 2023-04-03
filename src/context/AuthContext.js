import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import { auth } from '../firebase/firebase'

/* Context for storing currently authenticated user */
export const AuthContext = createContext();

/* Provider for AuthContext */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)

    const [authState, setAuthState] = useState({
        isAuthLoaded: false,
        listener: null
    })

    useEffect(() => {
        if (!authState.listener) {
            setAuthState({
                ...authState, listener: onAuthStateChanged(auth, (user) => {
                    setUser(user)
                    if (user) {
                        setUsername(user.displayName)
                    }
                    setAuthState(oldState => ({ ...oldState, isAuthLoaded: true }));
                })
            })
        }

        // unsubscribe
        return () => {
            if (authState.listener)
                authState.listener()
        }
    }, [authState])


    return (
        <AuthContext.Provider value={{ user, username, authState }}>{children}</AuthContext.Provider>
    );
};