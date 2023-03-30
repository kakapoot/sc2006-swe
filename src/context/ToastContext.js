import React, { createContext, useEffect, useState } from "react";


export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    // queue of toast messages to be shown
    const [toastMessages, setToastMessages] = useState([])
    // number of toasts shown on screen
    const [toastCount, setToastCount] = useState(0)

    const queueToast = (message) => {
        setToastMessages((prevState) =>
            [...prevState, message]
        )
        setToastCount((prevState) => prevState + 1)
    }

    useEffect(() => {
        // clear toast messages list if no more toast notifications on screen currently
        if (toastCount === 0) {
            setToastMessages([])
        }
    }, [toastCount])


    return (
        <ToastContext.Provider value={{ toastMessages, toastCount, queueToast, setToastCount }}>
            {children}
        </ToastContext.Provider>
    );
};