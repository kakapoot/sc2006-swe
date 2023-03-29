import React, { useEffect, useState } from 'react'
import { GroupCard } from '../components/GroupCard'
import { Searchbar } from '../components/Searchbar'
import { LoadingSpinner } from '../components/LoadingSpinner'

export default function FindGroupsPages() {
    const [groups, setGroups] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filterTags, setFilterTags] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true)

        // get initial group list
        handleSearch()
    }, [])


    const handleSearchTextChange = (searchText) => {
        setSearchText(searchText)
    }


    const handleFilterTagsChange = (filterTags) => {
        setFilterTags(filterTags)
    }

    const handleSearch = () => {
        console.log(searchText)
        console.log(filterTags)

        setIsLoading(true)
        fetch('http://localhost:5000/find_groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'searchText': searchText, 'filterTags': filterTags })
        })
            .then(response => response.json())
            .then(data => {
                Object.keys(data).length !== 0 ? setGroups(data.groups) : setGroups([])
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }


    return (
        <>
            { /* Content */}
            <div className="col">
                <div className="container">
                    {/* Header */}
                    <h2 className="my-5 d-flex"><strong>Public Groups</strong></h2>
                    <Searchbar searchText={searchText}
                        onSearchTextChange={handleSearchTextChange}
                        onSearch={handleSearch}
                        onFilterTagsChange={handleFilterTagsChange}
                        prevFilterTags={filterTags} />


                    {/* Groups */}
                    <div className="d-flex flex-column gap-5">
                        {isLoading &&
                            <LoadingSpinner />}
                        {!isLoading && groups.map((group) => <GroupCard group={group} key={group.name} />)}
                        {!isLoading && groups.length === 0 ? "No matching groups found" : null}
                    </div>
                </div>
            </div>
        </>
    )
}
