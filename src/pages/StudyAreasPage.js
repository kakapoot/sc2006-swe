import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import GoogleMap from '../components/GoogleMap'

export default function StudyAreasPage() {
    const tagData = {
        typesOfStudyArea: ["Library", "Cafe", "Fast Food Restaurant", "University"],
        regions: ["North", "South", "East", "West", "Central"],
    }

    const [searchText, setSearchText] = useState("")
    const [filterTags, setFilterTags] = useState([])

    const handleSearchTextChange = (searchText) => {
        setSearchText(searchText)
    }

    const handleFilterTagsChange = (filterTags) => {
        setFilterTags(filterTags)
    }

    const handleSearch = () => {
        console.log("Search text: " + searchText)
        console.log("Filter tags: " + filterTags)
        setSearchText("")
    }

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                <div className="col">
                    <div className="container">
                        {/* Header */}
                        <h2 className="my-5 d-flex"><strong>Study Areas</strong></h2>
                        <div className="App">

                          <GoogleMap />

                      </div>
                    </div>
                </div>
            </main>
        </div>
    )
