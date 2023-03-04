import React from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'

export default function MyGroupsPage() {
    // TODO: replace with actual fetched data
    const groups = [{
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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
                                <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                        <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                    </svg>
                                    <span className="text-uppercase">Create New Group</span>
                                </button>
                                {/* TODO: join private group modal */}
                                <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                    <span>Join Private Group</span>
                                </button>
                            </div>
                        </div>

                        {/* Groups */}
                        <div className="d-flex flex-column gap-5">
                            {groups.map((group) => <GroupCard group={group} key={group.id} />)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
