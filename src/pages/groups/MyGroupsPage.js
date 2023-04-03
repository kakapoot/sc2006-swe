import React, { useContext, useState, useEffect } from 'react'
import { GroupCard } from '../../components/groups/GroupCard'
import { JoinPrivateGroupModal } from '../../components/groups/JoinPrivateGroupModal'
import { EditGroupProfileModal } from '../../components/groups/EditGroupProfileModal'
import { AuthContext } from '../../context/AuthContext'
import { useUserGroups } from '../../utils/Fetch';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function MyGroupsPage() {
    const [groups, setGroups] = useState([])
    const { username } = useContext(AuthContext)

    // fetch groups data from firebase based on currently authenticated user
    const { data, isLoading } = useUserGroups(username)

    useEffect(() => {
        if (data) {
            Object.keys(data).length !== 0 ? setGroups(data.groups) : setGroups([])
        }
    }, [data])

    // initialize empty data for creating new group
    const emptyGroupProfileData = {
        groupId: "",
        name: "",
        privacy: "private",
        capacity: 10,
        studyArea: {
            name: "",
            formatted_address: ""
        },
        description: "",
        tags: {
            subjects: [],
            educationLevels: [],
            learningStyles: [],
            regions: []
        },
        members: [],
        owner: "",
    }

    return (
        <>
            { /* Content */}
            <div className="col">
                <div className="container">
                    {/* Header */}
                    <div className="my-5 d-flex justify-content-between align-items-center">
                        <h2><strong>My Groups</strong></h2>

                        <div className="d-flex gap-3 align-items-center">
                            <EditGroupProfileModal isCreateGroup={true}
                                prevGroupData={emptyGroupProfileData} />

                            <JoinPrivateGroupModal />
                        </div>
                    </div>

                    {/* Groups */}
                    <div className="d-flex flex-column gap-5">
                        {/* Loading */}
                        {isLoading && <LoadingSpinner />}

                        {!isLoading && groups && groups.map((group) =>
                            <GroupCard isGroupMember={group.members.includes(username)} group={group} key={group.groupId} />
                        )}
                        {!isLoading && groups.length === 0 ? "You are not currently in any groups" : null}
                    </div>
                </div>
            </div>
        </>
    )
}
