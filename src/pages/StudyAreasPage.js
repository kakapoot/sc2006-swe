import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Searchbar } from '../components/Searchbar'

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
    // TODO : handle search with current search string and current filters
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
                        <Searchbar searchText={searchText}
                            onSearchTextChange={handleSearchTextChange}
                            onSearch={handleSearch}
                            onFilterTagsChange={handleFilterTagsChange}
                            prevFilterTags={filterTags}
                            tagData={tagData} />

                        <div>Map</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
