import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'
import { Searchbar } from '../components/Searchbar'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses'

export default function FindGroupsPages() {
    // TODO: replace with actual fetched data
    
    // const groups = [{
    //     groupId: "1",
    //     name: "Wholesome Study Group",
    //     studyArea: "Lee Kong Chian Reference Library",
    //     // TODO : REFACTOR tags : { subjects: [...], ... }
    //     tags: ["Mathematics", "Physics", "Secondary", "Visual", "Auditory", "East"],
    //     members: [
    //         {
    //             userId: "1",
    //             imgSrc: "/user_img.png"
    //         },
    //         {
    //             userId: "2",
    //             imgSrc: "/user_img.png"
    //         }]
    // },
    // {
    //     groupId: "2",
    //     name: "Memes and Dreams",
    //     studyArea: "Tampines Regional Library",
    //     tags: ["Chemistry"],
    //     members: [
    //         {
    //             userId: "1",
    //             imgSrc: "/user_img.png"
    //         },
    //         {
    //             userId: "2",
    //             imgSrc: "/user_img.png"
    //         }]
    // }
    // ]

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
    
    ////////////////////////////////////////////////////////////////////////
    const [groups, setGroups] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:5000/update_group', {
            'method':'GET',
            headers: {
                'Content-Type':'applications/json'
            }
        })
        .then(response => response.json())
        .then(response => setGroups(response))
        .catch(error => console.log(error))
    },[])
    // [{'education_level': 'University', 'group_code': 'ABCD', 'privacy': 'Private', 'learning_style': ['Visual'], 'members': ['john3'], 'subjects': ['math', 'physics'], 'description': 'Lorem ', 'name': 'Wholesome Study Group', 'study_area': 'Lee Kong Chian Reference Library', 'region': ['Central'], 'capacity': '20'}, {'learning_style': ['Reading/Writing'], 'members': ['fred1', 'elroy7'], 'capacity': 10, 'study_area': 'Tampines Regional Library', 'privacy': 'Public', 'region': ['East'], 'subjects': ['chemistry'], 'name': 'Memes and Dreams', 'education_level': ['Junior College'], 'description': 'testing testing'}, {'description': 'sda', 'subjects': ['Engineering', 'Business', 'Computer Science', 'Physics', 'Biology', 'Chemistry'], 'privacy': 'private', 'studyArea': 'dsa', 'learningStyles': ['Kinesthetic', 'Reading / Writing'], 'educationLevel': ['Pre-university / JC', 'University'], 'capacity': 10, 'regions': ['East', 'West'], 'name': 'das'}, {'name': 'group1', 'learningStyles': ['Reading / Writing'], 'regions': ['East', 
    // 'West'], 'educationLevel': ['Polytechnic'], 'capacity': 10, 'privacy': 'public', 'description': 'des1', 'subjects': ['Mathematics'], 'studyArea': 'area1'}, {'description': 'sda', 'capacity': 10, 'privacy': 
    // 'private', 'studyArea': 'das', 'name': 'sad'}, {'subjects': ['History'], 'regions': ['East'], 'name': 'sda', 'learningStyles': ['Reading / Writing'], 'educationLevel': ['Polytechnic'], 'capacity': 10, 'description': 'sda', 'privacy': 'private', 'studyArea': 'dsa'}]
    // Currently sent over in this format
    /////////////////////////////////////////////////////////////////////////



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
                            {/* {groups.map((group) => <GroupCard group={group} key={group.groupId} />)} */}
                            {groups.map((group) => <GroupCard group={group} key={group.name} />)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
