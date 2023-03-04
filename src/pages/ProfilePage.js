import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { LargeUserIcon } from '../components/UserIcon'
import { GroupDisplayTag } from '../components/GroupTag'
import { useParams } from 'react-router';

export default function ProfilePage() {
    const { userId } = useParams();
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(null)
    const [userData, setUserData] = useState(null)

    // TODO 
    useEffect(() => {
        if (userId === "1") {
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
                birthday: new Date(2005, 3, 28),
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
                birthday: new Date(2001, 1, 22),
                organization: "Nanyang Technological University",
                aboutMe: "Test.",
                imgSrc: "/user_img.png",
                studyInterests: ["Mathematics", "Computer Science"],
                educationLevels: ["University"],
                learningStyles: ["Visual"],
            })
    }

    const getAge = (birthday) => Math.floor((new Date() - birthday.getTime()) / 3.15576e+10)

    return (
        <div className="container-fluid">
            <main className="row">
                <Navbar />
                { /* Content */}
                {userData && <div className="col">
                    {/* Header */}
                    <div className="row bg-secondary">
                        <div className="col text-start">
                            <div className="d-flex justify-content-between align-items-center my-4 text-light container">
                                <div className="d-flex flex-column align-items-start">
                                    <h5>@{userData.username}</h5>
                                    <h2><strong>{userData.name}</strong></h2>
                                </div>

                                {/* Show Edit button if profile belongs to authenticated user */}
                                {isAuthenticatedUser && <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                    <span>Edit</span>
                                </button>}
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
                                                <div key={tag}><GroupDisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Education Levels</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userData.educationLevels.map((tag) =>
                                                <div key={tag}><GroupDisplayTag name={tag} /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span><strong>Learning Styles</strong></span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {userData.learningStyles.map((tag) =>
                                                <div key={tag}><GroupDisplayTag name={tag} /></div>
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
