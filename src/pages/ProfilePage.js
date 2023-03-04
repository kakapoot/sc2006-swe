import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { LargeUserIcon } from '../components/UserIcon'
import { DisplayTag } from '../components/Tag'
import { useParams } from 'react-router';
import { EditProfileModal } from '../components/EditProfileModal';

export default function ProfilePage() {
    const { userId } = useParams();
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(null)
    const [userData, setUserData] = useState(null)

    // TODO 
    useEffect(() => {
        if (userId === "0") {
            setIsAuthenticatedUser(true)
        } else {
            setIsAuthenticatedUser(false)
        }
        fetchUserData()
    }, [isAuthenticatedUser, userId])


    // TODO : fetch user data based on user ID
    const fetchUserData = () => {
        // check authenticated user context
        isAuthenticatedUser
            ? setUserData({
                username: "laoganma",
                name: "Lao Gan Ma",
                gender: "Female",
                birthday: "03-28-2005",
                organization: "Nanyang Technological University",
                aboutMe: "Lorem ipsum dolor sit amet, conseonsectetur adipiscing elit, sed do eiusmod tempor incidiductetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, conseonsectetur adipiscing elit, sed do eiusmod tempor incidiductetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                imgSrc: "/user_img2.png",
                studyInterests: ["Mathematics", "Computer Science"],
                educationLevels: ["University"],
                learningStyles: ["Visual"],
            })
            : setUserData({
                username: "peepoo",
                name: "Mr Mittens",
                gender: "Male",
                birthday: "02-05-2001",
                organization: "Nanyang Technological University",
                aboutMe: "Test.",
                imgSrc: "/user_img.png",
                studyInterests: ["Mathematics", "Computer Science"],
                educationLevels: ["University"],
                learningStyles: ["Visual"],
            })
    }

    const getAge = (birthday) => Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e+10)

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                {userData && <div className="col">
                    {/* Header */}
                    <div className="row bg-secondary">
                        <div className="col text-start">
                            <div className="d-flex justify-content-between align-items-center my-4 container">
                                <div className="d-flex flex-column align-items-start text-light">
                                    <h5>@{userData.username}</h5>
                                    <h2><strong>{userData.name}</strong></h2>
                                </div>

                                {/* Show Edit button if profile belongs to authenticated user */}
                                {isAuthenticatedUser && <EditProfileModal />}
                            </div>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="col text-start">
                        <div className="container">
                            <div className="row my-5">
                                {/* Profile Sidebar */}
                                <div className="col-lg-4 d-flex flex-column align-items-start gap-3">
                                    <LargeUserIcon imgSrc={userData.imgSrc} />
                                    <span><strong>{getAge(userData.birthday)}, {userData.gender}</strong></span>
                                    <span>{userData.organization}</span>

                                    <div>
                                        <span><strong>Study Interests</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userData.studyInterests.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Education Levels</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userData.educationLevels.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Learning Styles</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userData.learningStyles.map((tag) =>
                                                <div key={tag}><DisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Body */}
                                <div className="col d-flex flex-column align-items-start">
                                    <h5><strong>About Me</strong></h5>
                                    <p>{userData.aboutMe}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>}
            </main >
        </div >
    )
}
