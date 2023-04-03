import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from '../components/Toast'

/* Page Layout for a Public Route */
export default function PublicPageLayout() {
    return (
        <div className="container-fluid">
            <main className="row">
                <ToastContainer />

                <Outlet />

                {/* Sidebar image */}
                <div className="col p-0">
                    <img src="/login_image.png" alt="Login sidebar" className="w-100 vh-100 sticky-top" style={{ objectFit: "cover", objectPosition: "left" }} />
                </div>
            </main>
        </div>
    )
}
