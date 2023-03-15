import React, { useState, useEffect, useContext } from 'react'
import { Navbar } from '../components/Navbar'
import { DisplayTag, formatTagType } from '../components/Tag'
import { useParams } from 'react-router';
import { EditUserProfileModal } from '../components/EditUserProfileModal';
import { AuthContext } from '../context/AuthContext';

export default function UserProfilePage() {
    const { usernameParam } = useParams();
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(null)
    const [userProfileData, setUserProfileData] = useState(null)
    const { username } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // TODO 
    useEffect(() => {
        // if (usernameParam === username) {
        //     setIsAuthenticatedUser(true)
        // } else {
        //     setIsAuthenticatedUser(false)
        // }
        fetchUserProfileData()
        console.log(isAuthenticatedUser)
    }, [])

    // TODO : fetch user data based on user ID
    const fetchUserProfileData = () => {
        setIsLoading(true)
        // Send form data to Flask route
        fetch(`http://localhost:5000/get_user/${usernameParam}`)
            .then(response => response.json())
            .then(data => {
                setUserProfileData(data)
            })
            .catch(error => {
                console.error(error)
                setError("Unable to fetch data")
            })
            .finally(() => setIsLoading(false));
    }

    const handleUserProfileDataChange = (userProfileData) => {
        setUserProfileData(userProfileData)
    }

    const getAge = (birthday) => Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e+10)

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                {/* Loading */}
                {isLoading &&
                    <div className="col">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>}
                {/* Error */}
                {error && <div className="col">{error}</div>}

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
                                {isAuthenticatedUser && <EditUserProfileModal prevUserProfileData={userProfileData} onUserProfileDataChange={handleUserProfileDataChange} />}
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
            </main >
        </div >
    )
}
