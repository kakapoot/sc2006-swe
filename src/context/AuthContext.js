import React, { useEffect, useState } from "react";
import { auth } from '../firebase/firebase'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(setUser)
    }, []);

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        } else {
            setUsername(null)
        }
    }, [user])

    useEffect(() => {
        // TODO : for debugging purposes 
        console.log(user)
        console.log(username)
    }, [user, username])


    return (
        <AuthContext.Provider value={{ user, username }}>{children}</AuthContext.Provider>
    );
};