import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { ToastContainer } from '../components/Toast'

/* Page Layout for a Private Route */
export default function PrivatePageLayout() {
    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                <ToastContainer />

                <Outlet />
            </main>
        </div>
    )
}
