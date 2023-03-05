import React from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'
import { JoinPrivateGroupModal } from '../components/JoinPrivateGroupModal'
import { EditGroupProfileModal } from '../components/EditGroupProfileModal'

export default function MyGroupsPage() {
    // TODO: replace with actual fetched data
    const groups = [{
        groupId: "1",
        name: "Wholesome Study Group",
        studyArea: "Lee Kong Chian Reference Library",
        tags: ["Mathematics", "Physics", "Secondary", "Visual", "Auditory", "East"],
        members: [
            {
                userId: "1",
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
    },
    {
        groupId: "3",
        name: "bofa",
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
    },
    {
        groupId: "4",
        name: "ligma",
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

    const emptyGroupProfileData = {
        name: "",
        studyArea: "",
        subjects: [],
        educationLevels: [],
        learningStyles: [],
        regions: [],
        members: [],
        description: "",
        code: "",
        privacy: "",
        capacity: 10
    }

    // TODO : add created group to database
    const handleGroupProfileDataChange = (userProfileData) => {
        console.log(userProfileData)
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
                                <EditGroupProfileModal buttonName="Create New Group" prevGroupProfileData={emptyGroupProfileData} onGroupProfileDataChange={handleGroupProfileDataChange} />

                                <JoinPrivateGroupModal />
                            </div>
                        </div>

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
