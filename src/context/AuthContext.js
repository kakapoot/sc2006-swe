import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import { auth } from '../firebase/firebase'

export const AuthContext = createContext();

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
    }, [])

    useEffect(() => {
        console.log("----")
        console.log("username: " + username)
        console.log("auth state: " + authState.isAuthLoaded)
        if (user) {
            console.log("user: " + user.displayName)
        } else {
            console.log("user: not init")
        }

        console.log("----")
    }, [authState, user, username])


    return (
        <AuthContext.Provider value={{ user, username, authState }}>{children}</AuthContext.Provider>
    );
};