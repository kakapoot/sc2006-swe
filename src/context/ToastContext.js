import React, { createContext, useEffect, useState } from "react";


export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toastMessages, setToastMessages] = useState([])
    const [toastCount, setToastCount] = useState(0)

    useEffect(() => {
        // clear toast messages list if no more toast notifications on screen currently
        if (toastCount === 0) {
            setToastMessages([])
        }
    }, [toastCount])


    return (
        <ToastContext.Provider value={{ toastMessages, toastCount, setToastMessages, setToastCount }}>
            {children}
        </ToastContext.Provider>
    );
};