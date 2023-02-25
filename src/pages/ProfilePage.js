import React from 'react'
import { Navbar } from '../components/Navbar'

export default function ProfilePage() {
    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                <div className="col">
                    <div className="container">
                        Profile
                    </div>
                </div>
            </main>
        </div>
    )
}
