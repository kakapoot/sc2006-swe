import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { DisplayTag } from '../components/Tag'
import { useParams } from 'react-router';
import { EditGroupProfileModal } from '../components/EditGroupProfileModal';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function GroupProfilePage() {
    const { groupId } = useParams();
    const [isGroupCreator, setIsGroupCreator] = useState(true)
    const [isGroupMember, setIsGroupMember] = useState(true)
    const [groupData, setGroupData] = useState(null)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [membersData, setMembersData] = useState(null)

    // TODO : check if current authenticated user is group creator 
    // TODO : check if current authenticated user is group member, 
    // should be able to leave if in group, join if not in group, 
    // show error if not in group and group is private
    useEffect(() => {
        // TODO : placeholder
        // const userId = "0"

        // if (userId === "0") {
        //     setIsGroupCreator(true)
        //     setIsGroupMember(true)
        // } else {
        //     setIsGroupCreator(false)
        //     setIsGroupMember(false)
        // }
        fetchGroupData()
        fetchMembersData()
    }, [isGroupCreator, isGroupMember, groupId])

    // fetch group data based on group ID
    const fetchGroupData = () => {
        setIsLoading(true)
        // Send form data to Flask route
        fetch(`http://localhost:5000/get_group/${groupId}`)
            .then(response => response.json())
            .then(data => {
                setGroupData(data)
            })
            .catch(error => {
                console.error(error)
                setError("Unable to fetch data")
            })
            .finally(() => setIsLoading(false));
    }

    // fetch list of members details based on group ID
    const fetchMembersData = () => {
        setIsLoading(true)
        fetch(`http://localhost:5000/get_group_members/${groupId}`)
            .then(response => response.json())
            .then(data => {
                setMembersData(data)
            })
            .catch(error => {
                console.error(error)
                setError("Unable to fetch data")
            })
            .finally(() => setIsLoading(false));
    }

    const handleGroupDataChange = (userProfileData) => {
        setGroupData(userProfileData)
    }

    // TODO
    const handleJoinSubmit = () => {
        console.log("Join")
    }

    // TODO
    const handleLeaveSubmit = () => {
        console.log("Leave")
    }

    const formatTagType = (text) => {
        return text
            // insert a space between each word
            .replace(/([A-Z])/g, ' $1')
            // uppercase first character of each word
            .replace(/^./, (str) => str.toUpperCase())
    }

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                {/* Loading */}
                {isLoading &&
                    <div className="col">
                        <LoadingSpinner />
                    </div>}
                {/* Error */}
                {error && <div className="col">{error}</div>}

                { /* Content */}
                {!isLoading && groupData && <div className="col">
                    {/* Header */}
                    <div className="row bg-secondary">
                        <div className="col">
                            <div className="d-flex justify-content-between align-items-center my-4 container">
                                <div className="d-flex flex-column align-items-start text-light">
                                    <h5 className="text-uppercase">{groupData.privacy} Group (Code: {groupData.groupId})</h5>
                                    <h2><strong>{groupData.name}</strong></h2>
                                </div>

                                <div className="d-flex gap-3">
                                    {/* Show Edit button if authenticated user is creator of group */}
                                    {isGroupCreator && <EditGroupProfileModal buttonName="Edit Group" prevGroupData={groupData} onGroupDataChange={handleGroupDataChange} />}

                                    {/* Show Leave button if authenticated user is group member */}
                                    {isGroupMember &&
                                        <button onClick={handleLeaveSubmit} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                                            </svg>
                                            <span className="text-uppercase">Leave</span>
                                        </button>}

                                    {/* Show Join button if authenticated user is not group member */}
                                    {!isGroupMember &&
                                        <button onClick={handleJoinSubmit} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                            </svg>
                                            <span className="text-uppercase">Join</span>
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile */}
                    {!isLoading && groupData &&
                        <div className="col">
                            <div className="container">
                                <div className="row my-5">
                                    {/* Profile Sidebar */}
                                    <div className="col-lg-4 d-flex flex-column align-items-start gap-3">
                                        {groupData && Object.entries(groupData.tags).map(([tagType, tags]) => (
                                            <div key={tagType} className="d-flex flex-column align-items-start">
                                                <span><strong>{formatTagType(tagType)}</strong></span>

                                                <div className="d-flex flex-wrap gap-2">
                                                    {tags.map((tag) =>
                                                        <div key={tag}><DisplayTag name={tag} /></div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="w-100">
                                            {/* TODO : indicate group leader */}
                                            {/* TODO : disable setting capacity below current no. of members */}
                                            <h5><strong>Members ({groupData.members.length} / {groupData.capacity})</strong></h5>
                                            <div className="d-flex flex-column gap-4">
                                                {membersData && membersData.members.map((member) =>
                                                    <Link to={`/user/${member.username}`} key={member.username} className="text-start btn btn-warning">
                                                        <div className="d-flex gap-2">
                                                            <div className="d-flex flex-column w-100">
                                                                <span><strong>{member.name}</strong></span>
                                                                <span>{member.organization}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Body */}
                                    <div className="col d-flex flex-column align-items-start">
                                        <h5><strong>Description</strong></h5>
                                        <p>{groupData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>}
            </main >
        </div >
    )
}
