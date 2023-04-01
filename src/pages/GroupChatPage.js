import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import { useGroup, useUserProfile, useUserRights } from '../utils/Fetch';
import { ToastContext } from '../context/ToastContext';
import { ReceiveChatMessage, SendChatMessage } from '../components/ChatMessage';
import { Timestamp, collection, onSnapshot, query, addDoc, orderBy, limit } from "firebase/firestore";
import { db } from '../firebase/firebase';

export default function GroupChatPage() {
    const { groupId } = useParams();

    const { username } = useContext(AuthContext)

    // fetch user rights based on currently authenticated user
    const { userRights }
        = useUserRights(username, groupId)
    // fetch user profile data
    const { data: userProfileData, error: userProfileError, isLoading: userProfileIsLoading } = useUserProfile(username)
    // fetch group data based on group ID
    const { data: groupData, error: groupError, isLoading: groupIsLoading } = useGroup(groupId)

    const [inputMessage, setInputMessage] = useState("")
    const [messagesData, setMessagesData] = useState([])

    // toast notifications
    const { queueToast } = useContext(ToastContext)
    const navigate = useNavigate()


    // get messages subcollection in group document inside chatdb collection
    const chatMessagesRef = collection(db, "chatdb", groupId, "messages")

    const handleMessageSubmit = async () => {
        const messageData = {
            username: username,
            name: userProfileData.name,
            message: inputMessage,
            timestamp: Timestamp.now()
        }

        // Add setMessage to firestore group chat document
        await addDoc(chatMessagesRef, messageData)

        setInputMessage("")
    }

    // set view based on user rights
    useEffect(() => {
        if (userRights.isFetched && !userRights.isGroupMember) {
            queueToast(`You must be a member of this group to view the group chat`)
            navigate("/my_groups")
        }
    }, [userRights])

    useEffect(() => {
        // Get 50 most recent messages
        const q = query(
            chatMessagesRef,
            orderBy("timestamp"),
            limit(50)
        )

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messagesResult = []
            querySnapshot.forEach((doc) => {
                messagesResult.push({ ...doc.data(), id: doc.id })
            })
            setMessagesData(messagesResult)
        })

        return () => unsubscribe
    }, [])


    return (
        <>
            {/* Loading */}
            {(userProfileIsLoading || !userRights.isFetched || groupIsLoading) &&
                <div className="col">
                    <LoadingSpinner />
                </div>}
            {/* Error */}
            {groupError && <div className="col">{groupError.message}</div>}

            { /* Content */}
            {!userProfileIsLoading && userRights.isFetched && !groupIsLoading && groupData &&
                <div className="col d-flex flex-column vh-100">
                    {/* Header */}
                    <div className="row bg-secondary">
                        <div className="col">
                            <div className="d-flex justify-content-between align-items-center my-4 container">
                                <div className="d-flex flex-column align-items-start text-light">
                                    <h5>
                                        <span className="text-uppercase">{groupData.privacy} Group Chat</span>
                                    </h5>
                                    <h2><strong>{groupData.name}</strong></h2>
                                </div>

                                <div className="d-flex gap-3 align-items-center">
                                    {/* Show Group Profile button */}
                                    <button onClick={() => navigate(`/group/${groupId}`)} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <span className="text-uppercase">Group Profile</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat messages container*/}
                    <div className="col overflow-auto my-5 d-flex flex-column-reverse">
                        <div className="container">
                            <div className="col fs-5 d-flex flex-column gap-3">
                                {/* chat messages here */}
                                {messagesData.map((messageData) =>
                                    messageData.username === username
                                        ? <SendChatMessage key={messageData.id} message={messageData.message} username={messageData.username} name={messageData.name} timestamp={messageData.timestamp.toDate().toLocaleString()} />
                                        : <ReceiveChatMessage key={messageData.id} message={messageData.message} username={messageData.username} name={messageData.name} timestamp={messageData.timestamp.toDate().toLocaleString()} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Chatbar */}
                    <div className="container">
                        <div className="mb-5 d-flex gap-3 text-primary align-items-center">
                            {/* Chat message input */}
                            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
                                className="form-control form-control-lg" name="inputMessage" placeholder="Write a message..." />

                            {/* TODO: send message on keyboard enter button */}
                            {/* Send button */}
                            <button onClick={handleMessageSubmit} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                </svg>
                                <span>Send</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
