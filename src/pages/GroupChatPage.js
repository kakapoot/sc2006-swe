import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import useSWR from 'swr';
import { fetcher } from "../components/Util";
import { ToastContext } from '../context/ToastContext';
import { ReceiveChatMessage, SendChatMessage } from '../components/ChatMessage';
import { Timestamp, collection, onSnapshot, query, addDoc, orderBy, limit } from "firebase/firestore";
import { db } from '../firebase/firebase';

export default function GroupChatPage() {
    const { groupId } = useParams();

    const { username } = useContext(AuthContext)

    // fetch user rights based on currently authenticated user
    const { data: userRightsData, error: userRightsError, isLoading: userRightsIsLoading, mutate: userRightsMutate, isMutating: userRightsIsMutating }
        = useSWR(`http://localhost:5000/get_user_rights/${username}?groupId=${groupId}`, fetcher)

    // fetch user profile data
    const { data: userProfileData, error, isLoading: userProfileIsLoading, mutate } = useSWR(`http://localhost:5000/get_user/${username}`, fetcher)

    const [userRights, setUserRights] = useState({
        isGroupOwner: false,
        isGroupMember: false
    })

    const [isLoading, setIsLoading] = useState(false)

    const [inputMessage, setInputMessage] = useState("")
    const [messagesData, setMessagesData] = useState([])

    // toast notifications
    const { queueToast } = useContext(ToastContext)

    // fetch group data based on group ID
    const { data: groupData, error: groupError, isLoading: groupIsLoading, mutate: groupMutate }
        = useSWR(`http://localhost:5000/get_group/${groupId}`, fetcher)

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
        // data not fetched yet
        if (!userRightsData) {
            return
        }

        // TODO : for restricting access to group chat
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
            {(userProfileIsLoading || userRightsIsLoading || groupIsLoading) &&
                <div className="col">
                    <LoadingSpinner />
                </div>}
            {/* Error */}
            {groupError && <div className="col">{groupError.message}</div>}

            { /* Content */}
            {!userProfileIsLoading && !userRightsIsLoading && !groupIsLoading && groupData &&
                <div className="col d-flex flex-column vh-100">
                    {/* Header */}
                    <div className="row bg-secondary">
                        <div className="col">
                            <div className="my-4 container">
                                <div className="d-flex flex-column align-items-start text-light">
                                    <h5>
                                        <span className="text-uppercase">{groupData.privacy} Group Chat</span>
                                    </h5>
                                    <h2><strong>{groupData.name}</strong></h2>
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
                        <div className="mb-5 d-flex gap-3 text-primary">
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
