import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'
import { Searchbar } from '../components/Searchbar'

export default function FindGroupsPages() {
    // TODO: replace with actual fetched data
    const groups = [{
        groupId: "1",
        name: "Wholesome Study Group",
        studyArea: "Lee Kong Chian Reference Library",
        // TODO : REFACTOR tags : { subjects: [...], ... }
        tags: ["Mathematics", "Physics", "Secondary", "Visual", "Auditory", "East"],
        members: [
            {
                userId: "1",
                imgSrc: "/user_img.png"
            },
            {
                userId: "2",
                imgSrc: "/user_img.png"
            }]
    },
    {
        groupId: "2",
        name: "Memes and Dreams",
        studyArea: "Tampines Regional Library",
        tags: ["Chemistry"],
        members: [
            {
                userId: "1",
                imgSrc: "/user_img.png"
            },
            {
                userId: "2",
                imgSrc: "/user_img.png"
            }]
    }
    ]

    // TODO: replace with actual fetched data
    const tagData = {
        subjects: ["Mathematics", "Physics", "Biology", "Chemistry", "English", "Art", "Music", "Geography", "History", "Computer Science", "Business", "Engineering"],
        educationLevels: ["Secondary", "Polytechnic", "Pre-university / JC", "University", "Post-graduate", "Doctoral"],
        learningStyles: ["Visual", "Auditory", "Reading / Writing", "Kinesthetic"],
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

    ////////////////////////////////////////////////////////////////////////// AGNES
        fetch('http://localhost:5000/find_groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchText + filterTags)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Handle response data here
            if (data.message === 'No such Group') {
                // Display no group message to user
            } 
        })
        .catch(error => console.error(error));
        
        setSearchText("")
    }
    
    ////////////////////////////////////////////////////////////////////

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                <div className="col">
                    <div className="container">
                        {/* Header */}
                        <h2 className="my-5 d-flex"><strong>Public Groups</strong></h2>
                        <Searchbar searchText={searchText}
                            onSearchTextChange={handleSearchTextChange}
                            onSearch={handleSearch}
                            onFilterTagsChange={handleFilterTagsChange}
                            prevFilterTags={filterTags}
                            tagData={tagData} />

                        {/* Groups */}
                        <div className="d-flex flex-column gap-5">
                            {groups.map((group) => <GroupCard group={group} key={group.groupId} />)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
