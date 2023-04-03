import React from 'react';
import { StudyAreasMap } from '../../components/study_areas/StudyAreasMap';

/* Page to view and search for study areas */
export default function StudyAreasPage() {
    return (
        <>
            { /* Content */}
            <div className="col">
                <div className="container">
                    {/* Header */}
                    <h2 className="my-5 d-flex"><strong>Study Areas</strong></h2>
                    <div style={{ height: "50vh" }}>
                        <StudyAreasMap />
                    </div>
                </div>
            </div >
        </>
    )
}

