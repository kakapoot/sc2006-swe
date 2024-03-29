import React, { useContext, useEffect, useState } from 'react'
import { GroupCard } from '../../components/groups/GroupCard'
import { Searchbar } from '../../components/Searchbar'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { AuthContext } from '../../context/AuthContext'

/* Page to view and filter public groups */
export default function FindGroupsPages() {
    const [groups, setGroups] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filterTags, setFilterTags] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { username } = useContext(AuthContext)

    // Get initial group list
    useEffect(() => {
        setIsLoading(true)
        handleSearch()
    }, [])


    const handleSearchTextChange = (searchText) => {
        setSearchText(searchText)
    }
    const handleFilterTagsChange = (filterTags) => {
        setFilterTags(filterTags)
    }

    // Search for groups using input search text and filer tags
    const handleSearch = () => {
        console.log(searchText)
        console.log(filterTags)

        setIsLoading(true)
        // Get matching groups from database
        fetch('http://localhost:5000/find_groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'searchText': searchText, 'filterTags': filterTags })
        })
            .then(response => response.json())
            .then(data => {
                // Update groups list
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
                        {!isLoading && groups.map((group) =>
                            <GroupCard isGroupMember={group.members.includes(username)} group={group} key={group.name} />
                        )}
                        {!isLoading && groups.length === 0 ? "No matching groups found" : null}
                    </div>
                </div>
            </div>
        </>
    )
}
