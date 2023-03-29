import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContext } from '../context/ToastContext'
import { SelectableUserCard } from './UserCard'

export function LeaveGroupModal({ username, groupId, onLeaveSubmit, setIsLoading, membersData, groupData, userRights }) {
    const { setToastCount, setToastMessages } = useContext(ToastContext)
    const navigate = useNavigate()

    // Get remaining members which are not the current group owner
    const remainingMembersData = membersData.members.filter(member => member.username !== groupData.owner)

    const [newOwner, setNewOwner] = useState(null)

    useEffect(() => {
        if (remainingMembersData.length > 0) {
            setNewOwner(remainingMembersData[0].username)
        }
    }, [])

    // TODO
    const handleLeaveSubmit = () => {
        const data = {
            username: username,
            groupId: groupId,
            newOwner: newOwner
        }

        setIsLoading(true)
        fetch('http://localhost:5000/leave_group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === 'left group successfully') {
                    // redirect back/ refresh page

                    onLeaveSubmit()
                    setToastMessages((prevState) =>
                        [...prevState, "Left group successfully"]
                    )
                    setToastCount((prevState) => prevState + 1)
                }
                else if (data.message === 'group deleted') {
                    // redirect back to My Groups page
                    navigate("/my_groups")

                    onLeaveSubmit()
                    setToastMessages((prevState) =>
                        [...prevState, "Left group successfully, group deleted"]
                    )
                    setToastCount((prevState) => prevState + 1)
                }
                else {
                    //error ? 
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            {/* Modal Button */}
            <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase"
                data-bs-toggle="modal" data-bs-target="#leaveGroupModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                </svg>
                <span>Leave</span>
            </button>

            {/* Modal */}
            <div className="modal fade" id="leaveGroupModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="p-4 modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3 className="modal-title" id="leaveGroupModalLabel"><strong>Leave Group</strong></h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body d-flex flex-column align-items-start gap-2">
                            {/* Display warnings */}
                            <p>Are you sure you want to leave this group?</p>

                            {/* User is group owner and the only remaining member */}
                            {userRights.isGroupOwner && groupData.members.length <= 1 &&
                                <p><strong>This group will be deleted after you leave!</strong></p>}

                            {/* User is group owner and there are other remaining group members */}
                            {userRights.isGroupOwner && groupData.members.length > 1 &&
                                <div className="w-100">
                                    <h5><strong>Select a new Group Owner</strong></h5>
                                    <div className="d-flex flex-column gap-4">
                                        {remainingMembersData.map((member) =>
                                            <SelectableUserCard
                                                onSelectUserCard={() => { setNewOwner(member.username) }}
                                                newOwner={newOwner}
                                                key={member.username} name={member.name} username={member.username} organization={member.organization} />
                                        )}
                                    </div>
                                </div>}
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer d-flex flex-column align-items-start">
                            <div className="mt-5 d-flex gap-3">
                                <button onClick={handleLeaveSubmit} type="button" className="btn p-3 btn-primary text-uppercase" data-bs-dismiss="modal">Leave Group</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
