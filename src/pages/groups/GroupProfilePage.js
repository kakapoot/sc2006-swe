import React, { useState, useContext, useEffect } from 'react'
import { DisplayTag, formatTagType } from '../../components/Tag'
import { useParams, useNavigate } from 'react-router';
import { EditGroupProfileModal } from '../../components/groups/EditGroupProfileModal';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { AuthContext } from '../../context/AuthContext';
import { useGroup, useGroupMembers, useUserRights } from '../../utils/Fetch';
import { LeaveGroupModal } from '../../components/groups/LeaveGroupModal';
import { ToastContext } from '../../context/ToastContext';
import { RedirectableUserCard } from '../../components/user/UserCard';
import { StudyAreaMinimap } from '../../components/study_areas/StudyAreaMinimap';

import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

/* Page to view given group profile */
export default function GroupProfilePage() {
    // Get group ID from URL
    const { groupId } = useParams();

    const { username } = useContext(AuthContext)
    // fetch user rights based on currently authenticated user
    const { userRights, mutate: userRightsMutate }
        = useUserRights(username, groupId)
    // fetch group data based on group ID
    const { data: groupData, error: groupError, isLoading: groupIsLoading, mutate: groupMutate }
        = useGroup(groupId)
    // fetch list of members details based on group ID
    const { data: membersData, isLoading: membersIsLoading, mutate: membersMutate }
        = useGroupMembers(groupId)

    const [isLoading, setIsLoading] = useState(false)

    // toast notifications
    const { queueToast } = useContext(ToastContext)
    const navigate = useNavigate()

    // Popover to show Google Maps when user clicks on Study Area
    const [popover, setPopover] = useState(null)
    useEffect(() => {
        if (groupData) {
            setPopover(
                <Popover id="popover" title="Popover title" style={{ maxWidth: "none", width: "600px", height: "600px" }
                }>
                    <StudyAreaMinimap studyArea={groupData.studyArea} />
                </Popover >)
        }
    }, [groupData])

    // Adds user to group when join button is clicked
    const handleJoinSubmit = () => {
        const data = {
            username: username,
            groupId: groupId
        }

        setIsLoading(true)
        // send request to join group
        fetch('http://localhost:5000/join_public_group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                switch (data.message) {
                    // Add user to group in database
                    case "joined group successfully":
                        onMembershipChange()

                        queueToast("Joined group successfully")
                        break
                    // Group is full
                    case "group is full":
                        queueToast("Group is full, unable to join")
                        break
                    default:
                    // error
                }
            })
            .catch(error => console.error(error))
    }

    const onMembershipChange = () => {
        // prevent join/leave button from showing up too early
        setTimeout(() => {
            setIsLoading(false)
        }, 500)

        // re-fetch data to update UI
        groupMutate()
        membersMutate()
        userRightsMutate()
    }

    return (
        <>
            {/* Loading */}
            {(!popover || isLoading || membersIsLoading || groupIsLoading) &&
                <div className="col">
                    <LoadingSpinner />
                </div>}
            {/* Error */}
            {groupError && <div className="col">{groupError.message}</div>}

            { /* Content */}
            {popover && !isLoading && !membersIsLoading && !groupIsLoading && groupData && <div className="col">
                {/* Header */}
                <div className="row bg-secondary">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center my-4 container">
                            <div className="d-flex flex-column align-items-start text-light">
                                <h5>
                                    <span className="text-uppercase">{groupData.privacy} Group</span>
                                    {groupData.privacy === "private" ? <span> (CODE: {groupData.groupId})</span> : null}
                                </h5>
                                <h2><strong>{groupData.name}</strong></h2>
                            </div>

                            <div className="d-flex gap-3 align-items-center">
                                {/* Loading header buttons */}
                                {isLoading && <LoadingSpinner />}

                                {/* Show Edit button if authenticated user is Owner of group */}
                                {!isLoading && userRights.isGroupOwner && <EditGroupProfileModal isCreateGroup={false}
                                    prevGroupData={groupData}
                                    mutate={groupMutate} />}

                                {/* Show Leave button if authenticated user is group member */}
                                {!isLoading && userRights.isGroupMember &&
                                    <LeaveGroupModal
                                        username={username}
                                        groupId={groupId}
                                        onLeaveSubmit={onMembershipChange}
                                        setIsLoading={setIsLoading}
                                        userRights={userRights} />}

                                {/* Show Chat button if authenticated user is group member */}
                                {!isLoading && userRights.isGroupMember &&
                                    <button onClick={() => navigate(`/chat/${groupId}`)} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <span className="text-uppercase">Chat</span>
                                    </button>
                                }

                                {/* Show Join button if authenticated user is not group member */}
                                {!isLoading && !userRights.isGroupMember &&
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
                {!groupIsLoading && groupData &&
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

                                    {/* List of Group Members */}
                                    <div className="w-100">
                                        {membersData && <h5><strong>Members ({membersData.members.length} / {groupData.capacity})</strong></h5>}
                                        <div className="d-flex flex-column gap-4">
                                            {membersData && membersData.members.map((member) =>
                                                <RedirectableUserCard key={member.username} name={member.name} username={member.username} organization={member.organization} groupOwner={groupData.owner} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Body */}
                                <div className="col d-flex flex-column align-items-start gap-3">
                                    {/* Study Area Popover */}
                                    <h5><strong>Study Area: <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                                        <a href="#" className="text-danger">
                                            <u>{groupData.studyArea.name}</u></a>
                                    </OverlayTrigger>
                                    </strong></h5>
                                    <div>
                                        <h5><strong>Description</strong></h5>
                                        <p style={{ whiteSpace: "pre-wrap" }}>{groupData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div >}
        </>
    )
}



