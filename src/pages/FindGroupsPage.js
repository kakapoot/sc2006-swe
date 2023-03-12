import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'
import { Searchbar } from '../components/Searchbar'

export default function FindGroupsPages() {
    const [tagData, setTagData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // fetch available tags in database
    useEffect(() => {
        setIsLoading(true)
        // Send form data to Flask route
        fetch('http://localhost:5000/get_tags')
            .then(response => response.json())
            .then(data => {
                setTagData(data)
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, [])

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
        setIsLoading(true)
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
            .catch(error => console.error(error))
            .finally(setIsLoading(false));

        setSearchText("")
    }

    ////////////////////////////////////////////////////////////////////////
    const [groups, setGroups] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:5000/update_group', {
            'method': 'GET',
            headers: {
                'Content-Type': 'applications/json'
            }
        })
            .then(response => response.json())
            .then(response => setGroups(response))
            .catch(error => console.log(error))
    }, [])
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

                        {isLoading &&
                            <div className="spinner-border text-primary" role="status"></div>}
                        {/* Groups */}
                        {!isLoading &&
                            <div className="d-flex flex-column gap-5">
                                {/* {groups.map((group) => <GroupCard group={group} key={group.groupId} />)} */}
                                {groups.map((group) => <GroupCard group={group} key={group.name} />)}
                            </div>}

                    </div>
                </div>
            </main>
        </div>
    )
}
