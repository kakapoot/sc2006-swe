import React from 'react'
import { Navbar } from '../components/Navbar'
import { Searchbar } from '../components/Searchbar'

export default function StudyAreasPage() {
    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                <div className="col">
                    <div className="container">
                        {/* Header */}
                        <h2 className="my-5 d-flex"><strong>Study Areas</strong></h2>
                        <Searchbar />

                        <div>Map</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
