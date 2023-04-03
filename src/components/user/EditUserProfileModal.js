import React, { useEffect, useState, useRef, useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'
import { LoadingSpinner } from '../LoadingSpinner'
import { SelectableTag, handleSelectTag, handleIsSelected, formatTagType } from '../Tag'
import { useTags } from '../../utils/Fetch'

/* Component to edit user profile */
export function EditUserProfileModal({ prevUserProfileData, mutate }) {
    const [profile, setProfile] = useState(prevUserProfileData)
    const [isLoading, setIsLoading] = useState(false)
    const btnRef = useRef(null)
    const [errors, setErrors] = useState({})

    const { queueToast } = useContext(ToastContext)

    const { data: tagData, isLoading: tagDataIsLoading } = useTags()

    useEffect(() => {
        setProfile(prevUserProfileData)
    }, [prevUserProfileData])


    const handleInputChange = (e) => {
        let inputType = e.target.name
        let inputValue = e.target.value

        setProfile({ ...profile, [inputType]: inputValue })
    }

    const handleApplyChangesSubmit = () => {
        // Validate form
        const errorResults = validate(profile)
        setErrors(errorResults)

        // Send request with form data to server if form is valid
        if (Object.keys(errorResults).length === 0) {
            // Update user data in database
            setIsLoading(true)
            fetch('http://localhost:5000/update_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...profile })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // Re-fetch user profile data to update User Profile page UI
                    mutate()

                    // Close modal
                    btnRef.current.click()
                    handleClose()

                    queueToast("Profile updated successfully")
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
        }
        // Invalid form
        else {
            queueToast("Please check all input details")
        }
    }

    const handleClose = () => {
        // clear unsaved changes
        setProfile(prevUserProfileData)
        setErrors(resetErrors)
    }

    // Input validation for edit user profile form
    const validate = (profileValues) => {
        const errors = {};
        if (!profileValues.name) {
            errors.name = "Name should not be blank!";
        }
        if (!profileValues.organization) {
            errors.organization = "Organization should not be blank!"
        }

        return errors;
    };

    const resetErrors = () => {
        const errors = {};
        return errors;
    };

    return (
        <div>
            {/* Modal Button */}
            <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase"
                data-bs-toggle="modal" data-bs-target="#editUserProfileModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                <span>Edit Profile</span>
            </button>

            {/* Modal */}
            <div className="modal fade" id="editUserProfileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="p-4 modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3 className="modal-title" id="editUserProfileModalLabel"><strong>Edit Profile</strong></h3>
                            <button ref={btnRef} onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body d-flex flex-column align-items-start gap-4">
                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="name"><strong>Name</strong></label>
                                <input type="text" value={profile.name} onChange={handleInputChange} className="form-control" name="name" placeholder="Enter name..." />
                                <span className="text-danger"><small>{errors.name}</small></span>
                            </div>
                            <div className="form-group d-flex flex-column">
                                <label htmlFor="gender"><strong>Gender</strong></label>
                                <select value={profile.gender} onChange={handleInputChange} className="form-select" name="gender">
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>
                            <div className="form-group d-flex flex-column">
                                <label htmlFor="birthday"><strong>Birthday</strong></label>
                                <input type="date" value={profile.birthday} onChange={handleInputChange} name="birthday" />
                            </div>
                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="organization"><strong>Organization</strong></label>
                                <input type="text" value={profile.organization} onChange={handleInputChange} className="form-control" name="organization" placeholder="Enter organization..." />
                                <span className="text-danger"><small>{errors.organization}</small></span>
                            </div>
                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="description"><strong>Description</strong></label>
                                <textarea value={profile.description} onChange={handleInputChange} rows="4" className="form-control" name="description" placeholder="Enter a description about yourself..."></textarea>
                            </div>


                            {/* Tags */}
                            {tagDataIsLoading && <LoadingSpinner />}
                            {tagData && Object.entries(tagData).map(([tagType, tags]) => (
                                <div key={tagType} className="d-flex flex-column align-items-start">
                                    <span><strong>{formatTagType(tagType)}</strong></span>

                                    <div className="d-flex flex-wrap gap-2">
                                        {tags.map((tag) =>
                                            <div key={tag}><SelectableTag name={tag} onSelectTag={() => { handleSelectTag(profile, setProfile, tagType, tag) }} isSelected={handleIsSelected(profile, tagType, tag)} /></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer d-flex flex-column align-items-start">
                            <div className="mt-5 d-flex gap-3 align-items-center">
                                {isLoading && <LoadingSpinner />}
                                {!isLoading && <button onClick={handleApplyChangesSubmit} type="button" className="btn p-3 btn-primary text-uppercase">Apply Changes</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
