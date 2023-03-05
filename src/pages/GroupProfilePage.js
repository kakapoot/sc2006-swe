import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { UserIcon } from '../components/UserIcon'
import { DisplayTag } from '../components/Tag'
import { useParams } from 'react-router';
import { EditGroupProfileModal } from '../components/EditGroupProfileModal';

export default function GroupProfilePage() {
    const { groupId } = useParams();
    const [isGroupCreator, setIsGroupCreator] = useState(null)
    const [isGroupMember, setIsGroupMember] = useState(null)
    const [groupProfileData, setGroupProfileData] = useState(null)

    // TODO : check if current authenticated user is group creator 
    // TODO : check if current authenticated user is group member, 
    // should be able to leave if in group, join if not in group, 
    // show error if not in group and group is private
    useEffect(() => {
        // TODO : placeholder
        const userId = "0"

        if (userId === "0") {
            setIsGroupCreator(true)
            setIsGroupMember(true)
        } else {
            setIsGroupCreator(false)
            setIsGroupMember(false)
        }
        fetchGroupProfileData()
    }, [isGroupCreator, isGroupMember, groupId])

    // TODO : fetch group data based on group ID
    const fetchGroupProfileData = () => {
        // check authenticated user context
        setGroupProfileData({
            name: "Wholesome Study Group",
            studyArea: "Lee Kong Chian Reference Library",
            subjects: ["Mathematics", "Computer Science"],
            educationLevels: ["University"],
            learningStyles: ["Visual"],
            regions: ["East"],
            members: [
                {
                    userId: "1",
                    imgSrc: "/user_img.png",
                    name: "Lao Gan Ma",
                    organization: "Nanyang Technological University",
                },
                {
                    userId: "2",
                    imgSrc: "/user_img.png",
                    name: "Bing Chilling",
                    organization: "Raffles Institution",
                }],
            description: "Lorem ipsum dolor sit amet, conseonsectetur adipiscing elit, sed do eiusmod tempor incidiductetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, conseonsectetur adipiscing elit, sed do eiusmod tempor incidiductetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            code: "69420",
            privacy: "private",
            capacity: 20
        })
    }

    const handleGroupProfileDataChange = (userProfileData) => {
        setGroupProfileData(userProfileData)
    }

    // TODO
    const handleJoinSubmit = () => {
        console.log("Join")
    }

    // TODO
    const handleLeaveSubmit = () => {
        console.log("Leave")
    }

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                {groupProfileData && <div className="col">
                    {/* Header */}
                    <div className="row bg-secondary">
                        <div className="col">
                            <div className="d-flex justify-content-between align-items-center my-4 container">
                                <div className="d-flex flex-column align-items-start text-light">
                                    <h5 className="text-uppercase">{groupProfileData.privacy} Group (Code: {groupProfileData.code})</h5>
                                    <h2><strong>{groupProfileData.name}</strong></h2>
                                </div>

                                <div className="d-flex gap-3">
                                    {/* Show Edit button if authenticated user is creator of group */}
                                    {isGroupCreator && <EditGroupProfileModal buttonName="Edit Group" prevGroupProfileData={groupProfileData} onGroupProfileDataChange={handleGroupProfileDataChange} />}

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
                    <div className="col">
                        <div className="container">
                            <div className="row my-5">
                                {/* Profile Sidebar */}
                                <div className="col-lg-4 d-flex flex-column align-items-start gap-3">
                                    <div>
                                        <span><strong>Subjects</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {groupProfileData.subjects.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Education Levels</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {groupProfileData.educationLevels.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Learning Styles</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {groupProfileData.learningStyles.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Regions</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {groupProfileData.regions.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        {/* TODO : indicate group leader */}
                                        {/* TODO : disable setting capacity below current no. of members */}
                                        <h5><strong>Members ({groupProfileData.members.length} / {groupProfileData.capacity})</strong></h5>
                                        <div className="d-flex flex-column gap-4">
                                            {groupProfileData.members.map((member) =>
                                                <div key={member.userId} className="d-flex gap-2">
                                                    <UserIcon imgSrc={member.imgSrc} userId={member.userId} />
                                                    <div className="d-flex flex-column">
                                                        <span><strong>{member.name}</strong></span>
                                                        <span>{member.organization}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Body */}
                                <div className="col d-flex flex-column align-items-start">
                                    <h5><strong>Description</strong></h5>
                                    <p>{groupProfileData.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </main >
        </div >
    )
}
