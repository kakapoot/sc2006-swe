import React from 'react'

export function SendChatMessage({ name, username, message, timestamp }) {
    return (
        <div className="d-flex flex-column align-self-end w-75 bg-info rounded p-3 gap-2">
            <span><strong>{name}</strong> @{username}</span>
            <span>{message}</span>
            <span className="align-self-end"><em><small>
                {timestamp}
            </small></em></span>
        </div>
    )
}

export function ReceiveChatMessage({ name, username, message, timestamp }) {
    return (
        <div className="d-flex flex-column align-self-start w-75 bg-warning rounded p-3 gap-2">
            <span><strong>{name}</strong> @{username}</span>
            <span>{message}</span>
            <span className="align-self-end"><em><small>
                {timestamp}
            </small></em></span>
        </div>
    )
}
