import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { SelectableTag, handleSelectTag, handleIsSelected, formatTagType } from './Tag'
import $ from 'jquery'

// TODO : ensure input fields are not blank
export function EditGroupProfileModal({ buttonName, prevGroupData, onGroupDataChange }) {
    const [profile, setProfile] = useState(prevGroupData)
    const [isLoading, setIsLoading] = useState(false)
    const [tagData, setTagData] = useState({})
    const [errors, setErrors] = useState({})

    const { username } = useContext(AuthContext)
    // fetch available tags in database
    useEffect(() => {
        setIsLoading(true)
        // Send form data to Flask route
        fetch('http://localhost:5000/get_tags')
            .then(response => response.json())
            .then(data => {
                setTagData(data)
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        setProfile(prevGroupData)
    }, [prevGroupData])

    const handleInputChange = (inputType, inputValue) => {
        setProfile({ ...profile, [inputType]: inputValue })
    }



    // TODO : update database with new group profile data
    const handleApplyChangesSubmit = (e) => {
        if (buttonName === "Create New Group") {
            // TODO : if creating a new group, create unique groupId, set authenticated user as member and owner of group
            const data = {
                ...profile,
                username: username
            };
            console.log(data)
            e.preventDefault()
            setErrors(validate(profile))
            // reset create group form
            setProfile(prevGroupData)

            /////////////////////////////////////////////////// send to flask
            setIsLoading(true)
            fetch('http://localhost:5000/create_group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Handle response data here
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
            ////////////////////////////////////////////////
        }

        else if (buttonName === "Edit Group") {
            console.log(profile)
            onGroupDataChange(profile)
            setProfile(prevGroupData)

            /////////////////////////////////////////////////// send to flask
            setIsLoading(true)
            fetch('http://localhost:5000/update_group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...profile })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Handle response data here
                    //returns group updated, cant check if creating or updating
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
            //////////////////////////////////////////////////
        }
    }

    $('#editGroupProfileModal').on('hide', function(e) {
      if (errors.length !== 0) {
        e.preventDefault();
      } 
    });

    const handleClose = () => {
        // clear unsaved changes
        setProfile(prevGroupData)
        setErrors(resetErrors())
    }

    const validate = (profileValues) => {
      const errors = {};
      if (!profileValues.name) {
        errors.name = "Name should not be blank!";
      }
      if (profileValues.capacity <= 0) {
        errors.capacity = "Capacity should be a positive number!"
      }
      if (!profileValues.studyArea) {
        errors.studyArea = "Study area should not be blank!"
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
                data-bs-toggle="modal" data-bs-target="#editGroupProfileModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                <span>{buttonName}</span>
            </button>

            {/* Modal */}
            <div className="modal fade" id="editGroupProfileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="p-4 modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3 className="modal-title" id="editGroupProfileModalLabel"><strong>{buttonName}</strong></h3>
                            <button onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body d-flex flex-column align-items-start gap-4">

                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="name"><strong>Name</strong></label>
                                <input type="text" value={profile.name} onChange={(e) => handleInputChange("name", e.target.value)} className="form-control" id="name" placeholder="Enter name..." />
                                <p className="modal-input-error">{errors.name}</p>
                            </div>
                            <div className="form-group d-flex flex-column">
                                <label htmlFor="privacy"><strong>Privacy</strong></label>
                                <select value={profile.privacy} onChange={(e) => handleInputChange("privacy", e.target.value)} className="form-select" id="privacy">
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                </select>
                            </div>
                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="capacity"><strong>Capacity</strong></label>
                                <input type="number" value={profile.capacity} onChange={(e) => handleInputChange("capacity", e.target.value)} className="form-control" id="capacity" placeholder="Enter capacity..." />
                                <p className="modal-input-error">{errors.capacity}</p>
                            </div>
                            {/* TODO : select from all available study areas in database */}
                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="studyArea"><strong>Study Area</strong></label>
                                <input type="text" value={profile.studyArea} onChange={(e) => handleInputChange("studyArea", e.target.value)} className="form-control" id="studyArea" placeholder="Enter study area..." />
                                <p className="modal-input-error">{errors.studyArea}</p>
                            </div>
                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="description"><strong>Description</strong></label>
                                <textarea value={profile.description} onChange={(e) => handleInputChange("description", e.target.value)} rows="4" className="form-control" id="description" placeholder="Enter a description about the group..."></textarea>
                            </div>

                            {/* Tags */}
                            {Object.entries(tagData).map(([tagType, tags]) => (
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
                            <div className="mt-5 d-flex gap-3">
                                <button onClick={handleApplyChangesSubmit} type="button" className="btn p-3 btn-primary text-uppercase" data-bs-dismiss="modal">Apply Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
