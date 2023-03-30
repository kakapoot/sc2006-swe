import React, { useState, useContext } from "react";
import Toast from 'react-bootstrap/Toast'
import { ToastContext } from "../context/ToastContext";

export function ToastContainer() {
    const { toastMessages, setToastCount } = useContext(ToastContext)

    return (<div className="toast-container position-fixed p-3 bottom-0 end-0">
        {toastMessages.map((toastMessage, index) => {
            return (
                <ToastNotification
                    key={index}
                    message={toastMessage}
                    setToastCount={setToastCount} />
            )
        })}
    </div>)
}

export function ToastNotification({ message }) {
    const { setToastCount } = useContext(ToastContext)

    const [showToast, setShowToast] = useState(true);
    // Automatically close toast and decrement counter of toast popups shown on screen after delay
    const closeShowToast = () => {
        setShowToast(false)
        setToastCount((prevState) => prevState - 1)
    };

    return (
        <Toast className="bg-danger text-light" show={showToast} onClose={closeShowToast} autohide delay={3_000}>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}
