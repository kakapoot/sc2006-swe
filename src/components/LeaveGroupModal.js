import React, { useState } from 'react'

export function LeaveGroupModal({ onLeaveSubmit }) {
    const handleClose = () => {
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
                            <button onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* TODO */}
                        {/* Modal Body */}
                        <div className="modal-body d-flex flex-column align-items-start gap-4">
                            Are you sure you want to leave the group?
                            <p>if is group leader and is only member of group, display warning message "group will be deleted after you leave"</p>
                            <p>if is group leader and there are other members of group, display selection of group members to pass leadership to</p>
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer d-flex flex-column align-items-start">
                            <div className="mt-5 d-flex gap-3">
                                <button onClick={onLeaveSubmit} type="button" className="btn p-3 btn-primary text-uppercase" data-bs-dismiss="modal">Leave Group</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
