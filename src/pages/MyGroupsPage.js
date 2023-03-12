import React from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'
import { JoinPrivateGroupModal } from '../components/JoinPrivateGroupModal'
import { EditGroupProfileModal } from '../components/EditGroupProfileModal'

export default function MyGroupsPage() {
    // TODO : fetch data from firebase based on currently authenticated user
    const [groups, setGroups] = ([])

    const emptyGroupProfileData = {
        groupId: "",
        name: "",
        privacy: "",
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

    // TODO : add created group to database
    const handleGroupProfileDataChange = (userProfileData) => {

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

                            {/* TODO: create group modal */}
                            <div className="d-flex gap-3">
                                <EditGroupProfileModal buttonName="Create New Group" prevGroupData={emptyGroupProfileData} onGroupDataChange={handleGroupProfileDataChange} />

                                <JoinPrivateGroupModal />
                            </div>
                        </div>

                        {/* Groups */}
                        <div className="d-flex flex-column gap-5">
                            {groups && groups.map((group) => <GroupCard group={group} key={group.groupId} />)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
