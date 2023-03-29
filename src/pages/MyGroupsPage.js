import React, { useContext, useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'
import { JoinPrivateGroupModal } from '../components/JoinPrivateGroupModal'
import { EditGroupProfileModal } from '../components/EditGroupProfileModal'
import { AuthContext } from '../context/AuthContext'
import useSWR from 'swr';
import { fetcher } from "../components/Util";
import { LoadingSpinner } from '../components/LoadingSpinner'

export default function MyGroupsPage() {
    const [groups, setGroups] = useState([])
    const { username } = useContext(AuthContext)

    // fetch groups data from firebase based on currently authenticated user
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_my_groups/${username}`, fetcher)

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
        studyArea: "",
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
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                <div className="col">
                    <div className="container">
                        {/* Header */}
                        <div className="my-5 d-flex justify-content-between align-items-center">
                            <h2><strong>My Groups</strong></h2>

                            <div className="d-flex gap-3">
                                <EditGroupProfileModal isCreateGroup={true}
                                    prevGroupData={emptyGroupProfileData}
                                    mutate={mutate} />

                                <JoinPrivateGroupModal />
                            </div>
                        </div>

                        {/* Groups */}
                        <div className="d-flex flex-column gap-5">
                            {/* Loading */}
                            {isLoading && <LoadingSpinner />}

                            {!isLoading && groups && groups.map((group) => <GroupCard group={group} key={group.groupId} />)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
