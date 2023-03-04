import React from 'react'
import { Link } from 'react-router-dom'
import { DisplayTag } from './Tag'
import { UserIcon } from './UserIcon'


export function GroupCard({ group }) {
    return (
        <div className="card">
            <div className="card-header px-4 bg-secondary d-flex align-items-center justify-content-between">
                <span className="fs-4 text-light">{group.name}</span>
                <span className="d-flex text-primary gap-4">
                    {/* <Link to="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                        </svg>
                    </Link> */}

                    {/* TODO: navigate to selected group profile page */}
                    <Link to="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                            <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
                        </svg>
                    </Link>
                </span>
            </div>

            <div className="card-body p-4 d-flex flex-column gap-2 align-items-start">
                <h5 className="card-title">
                    <strong>
                        <span>Study Area: </span>
                        <span className="text-danger">{group.studyArea}</span>
                    </strong>
                </h5>

                <div className="d-flex flex-wrap gap-2 ">
                    {group.tags.map((tag) => <DisplayTag name={tag} key={tag} />)}
                </div>

                <div className="d-flex flex-wrap gap-2">
                    {group.members.map((member, index) => <UserIcon imgSrc={member.imgSrc} userId={member.userId} key={member.userId} />)}
                </div>
            </div>
        </div>
    )
}
