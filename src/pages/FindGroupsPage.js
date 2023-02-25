import React from 'react'
import { Navbar } from '../components/Navbar'
import { GroupCard } from '../components/GroupCard'
import { Searchbar } from '../components/Searchbar'

export default function FindGroupsPages() {
    // TODO: replace with actual data
    const groups = [{
        id: "1",
        name: "Wholesome Study Group",
        studyArea: "Lee Kong Chian Reference Library",
        tags: ["Mathematics", "Physics", "Secondary", "Visual", "Auditory", "East"],
        members: ["/user_img.png", "/user_img.png"]
    },
    {
        id: "2",
        name: "Memes and Dreams",
        studyArea: "Tampines Regional Library",
        tags: ["Chemistry"],
        members: ["/user_img.png", "/user_img.png", "/user_img.png"]
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
                        <h2 className="my-5 d-flex"><strong>Public Groups</strong></h2>
                        <Searchbar />

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
