import React from 'react'
import { Navbar } from '../components/Navbar'

export default function ProfilePage() {
    return (
        <main className="row vh-100 overflow-auto">
            <Navbar />
            { /* Content */}
            <div className="col vh-100">
                <div className="container">ProfilePage</div>
            </div>
        </main>
    )
}