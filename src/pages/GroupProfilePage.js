import React, { useState, useEffect, useContext } from 'react'
import { DisplayTag, formatTagType } from '../components/Tag'
import { useParams } from 'react-router';
import { EditGroupProfileModal } from '../components/EditGroupProfileModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import useSWR from 'swr';
import { fetcher } from "../components/Util";
import { LeaveGroupModal } from '../components/LeaveGroupModal';
import { ToastContext } from '../context/ToastContext';
import { RedirectableUserCard } from '../components/UserCard';

export default function GroupProfilePage() {
    const { groupId } = useParams();

    const { username } = useContext(AuthContext)

    // fetch user rights based on currently authenticated user
    const { data: userRightsData, error: userRightsError, isLoading: userRightsIsLoading, mutate: userRightsMutate, isMutating: userRightsIsMutating }
        = useSWR(`http://localhost:5000/get_user_rights/${username}?groupId=${groupId}`, fetcher)

    const [userRights, setUserRights] = useState({
        isGroupOwner: false,
        isGroupMember: false
    })

    const [isLoading, setIsLoading] = useState(false)

    // toast notifications
    const { queueToast } = useContext(ToastContext)

    // fetch group data based on group ID
    const { data: groupData, error: groupError, isLoading: groupIsLoading, mutate: groupMutate }
        = useSWR(`http://localhost:5000/get_group/${groupId}`, fetcher)
    // fetch list of members details based on group ID
    const { data: membersData, error: membersError, isLoading: membersIsLoading, mutate: membersMutate }
        = useSWR(`http://localhost:5000/get_group_members/${groupId}`, fetcher)

    // set view based on user rights
    useEffect(() => {
        // data not fetched yet
        if (!userRightsData) {
            return
        }

        switch (userRightsData.message) {
            case "user is an owner":
                setUserRights({
                    isGroupOwner: true,
                    isGroupMember: true
                })
                break

            case "user is a member":
                setUserRights({
                    isGroupOwner: false,
                    isGroupMember: true
                })
                break

            case "user is not owner or member":
                setUserRights({
                    isGroupOwner: false,
                    isGroupMember: false
                })
                break
            default:
            // error

        }
    }, [userRightsData])

    // TODO
    const handleJoinSubmit = () => {
        const data = {
            username: username,
            groupId: groupId
        }

        setIsLoading(true)
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
                    case "joined group successfully":
                        onMembershipChange()

                        queueToast("Joined group successfully")
                        break
                    case "group is full":
                        //group full error
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
            {(isLoading || membersIsLoading || groupIsLoading) &&
                <div className="col">
                    <LoadingSpinner />
                </div>}
            {/* Error */}
            {groupError && <div className="col">{groupError.message}</div>}

            { /* Content */}
            {!isLoading && !membersIsLoading && !groupIsLoading && groupData && <div className="col">
                {/* Header */}
                <div className="row bg-secondary">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center my-4 container">
                            <div className="d-flex flex-column align-items-start text-light">
                                <h5 className="text-uppercase">{groupData.privacy} Group (Code: {groupData.groupId})</h5>
                                <h2><strong>{groupData.name}</strong></h2>
                            </div>

                            <div className="d-flex gap-3">
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
                                        membersData={membersData}
                                        groupData={groupData}
                                        userRights={userRights} />}

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
                                    <h5><strong>Study Area: </strong>{groupData.studyArea}</h5>
                                    <div>
                                        <h5><strong>Description</strong></h5>
                                        <p>{groupData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>}
        </>
    )
}
