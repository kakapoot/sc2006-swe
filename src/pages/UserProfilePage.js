import React, { useState, useEffect, useContext } from 'react'
import { DisplayTag, formatTagType } from '../components/Tag'
import { useParams } from 'react-router';
import { EditUserProfileModal } from '../components/EditUserProfileModal';
import { AuthContext } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import useSWR from 'swr';
import { fetcher } from '../components/Util';

export default function UserProfilePage() {
    const { username } = useParams()
    const [userProfileData, setUserProfileData] = useState(null)
    const { username: authenticatedUser } = useContext(AuthContext)

    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_user/${username}`, fetcher)

    useEffect(() => {
        setUserProfileData(data)
    }, [data])

    const getAge = (birthday) => Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e+10)

    return (
        <>
            {/* Loading */}
            {isLoading &&
                <div className="col">
                    <LoadingSpinner />
                </div>}
            {/* Error */}
            {!isLoading && error && <div className="col">{error.message}</div>}

            { /* Content */}
            {!isLoading && userProfileData && <div className="col">
                {/* Header */}
                <div className="row bg-secondary">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center my-4 container">
                            <div className="d-flex flex-column align-items-start text-light">
                                <h5>@{userProfileData.username}</h5>
                                <h2><strong>{userProfileData.name}</strong></h2>
                            </div>

                            {/* Show Edit button if profile belongs to authenticated user */}
                            {username === authenticatedUser ?
                                <EditUserProfileModal
                                    prevUserProfileData={userProfileData}
                                    mutate={mutate} />
                                : null}
                        </div>
                    </div>
                </div>

                {/* Profile */}
                <div className="col">
                    <div className="container">
                        <div className="row my-5">
                            {/* Profile Sidebar */}
                            <div className="col-lg-4 d-flex flex-column align-items-start gap-3">
                                <span><strong>{getAge(userProfileData.birthday)}, {userProfileData.gender}</strong></span>
                                <span>{userProfileData.organization}</span>

                                {/* Tags */}
                                {Object.entries(userProfileData.tags).map(([tagType, tags]) => (
                                    <div key={tagType} className="d-flex flex-column align-items-start">
                                        <span><strong>{formatTagType(tagType)}</strong></span>

                                        <div className="d-flex flex-wrap gap-2">
                                            {tags.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Profile Body */}
                            <div className="col d-flex flex-column align-items-start">
                                <h5><strong>Description</strong></h5>
                                <p>{userProfileData.description}</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>}
        </>
    )
}
