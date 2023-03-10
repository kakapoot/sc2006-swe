import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { DisplayTag } from '../components/Tag'
import { useParams } from 'react-router';
import { EditUserProfileModal } from '../components/EditUserProfileModal';

export default function UserProfilePage() {
    const { userId } = useParams();
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(null)
    const [userProfileData, setUserProfileData] = useState(null)
    const [user, setUser] = useState(null);


    // TODO 
    useEffect(() => {
        ///////////////////////////////////////////// get current user
        fetch('http://localhost:5000/currentuser')
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch user');
            }
        })
        .then(data => {
            setUser(data.user);
        })
        .catch(error => {
            console.log(error);
        });
      //////////////////////////////////////////
      //  if (userId === "0") {
        if (user) {
            setIsAuthenticatedUser(true)
        } else {
            setIsAuthenticatedUser(false)
        }
        fetchUserProfileData()
    }, [isAuthenticatedUser, userId])
 
    // TODO : fetch user data based on user ID
    const fetchUserProfileData = () => {
        // check authenticated user context
        // fetch(`/get_profile/${user}`)
        isAuthenticatedUser
            ? setUserProfileData({
                username: "laoganma",
                name: "Lao Gan Ma",
                gender: "Female",
                birthday: "2005-03-28",
                organization: "Nanyang Technological University",
                aboutMe: "Lorem ipsum dolor sit amet, conseonsectetur adipiscing elit, sed do eiusmod tempor incidiductetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, conseonsectetur adipiscing elit, sed do eiusmod tempor incidiductetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                studyInterests: ["Mathematics", "Computer Science"],
                educationLevels: ["University"],
                learningStyles: ["Visual"],
            })
            : setUserProfileData({
                username: "peepoo",
                name: "Mr Mittens",
                gender: "Male",
                birthday: "2001-01-02",
                organization: "Nanyang Technological University",
                aboutMe: "Test.",
                studyInterests: ["Mathematics", "Computer Science"],
                educationLevels: ["University"],
                learningStyles: ["Visual"],
            })
    }

    const handleUserProfileDataChange = (userProfileData) => {
        setUserProfileData(userProfileData)
    }

    const getAge = (birthday) => Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e+10)

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                {userProfileData && <div className="col">
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

                                    <div>
                                        <span><strong>Study Interests</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userProfileData.studyInterests.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Education Levels</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userProfileData.educationLevels.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Learning Styles</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userProfileData.learningStyles.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Body */}
                                <div className="col d-flex flex-column align-items-start">
                                    <h5><strong>About Me</strong></h5>
                                    <p>{userProfileData.aboutMe}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>}
            </main >
        </div >
    )
}
