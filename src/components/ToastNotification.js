import React, { useState } from "react";
import Toast from 'react-bootstrap/Toast'


export function ToastNotification({ message, onCloseShowToast }) {

    const [showToast, setShowToast] = useState(true);
    const closeShowToast = () => {
        setShowToast(false)
        onCloseShowToast()
    };

    return (
        <Toast className="bg-danger text-light" show={showToast} onClose={closeShowToast} autohide delay={3_000}>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}
