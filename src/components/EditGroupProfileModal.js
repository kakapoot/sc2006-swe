import React, { useEffect, useState } from 'react'
import { SelectableTag } from './Tag'

// TODO : ensure input fields are not blank
export function EditGroupProfileModal({ buttonName, prevGroupProfileData, onGroupProfileDataChange }) {
    // TODO : replace with actual available tags
    const tagData = {
        subjects: ["Mathematics", "Physics", "Biology", "Chemistry", "English", "Art", "Music", "Geography", "History", "Computer Science", "Business", "Engineering"],
        educationLevels: ["Secondary", "Polytechnic", "Pre-university / JC", "University", "Post-graduate", "Doctoral"],
        learningStyles: ["Visual", "Auditory", "Reading / Writing", "Kinesthetic"],
        regions: ["North", "South", "East", "West", "Central"]
    }

    const [profile, setProfile] = useState(prevGroupProfileData)

    useEffect(() => {
        setProfile(prevGroupProfileData)
    }, [prevGroupProfileData])


    const handleInputChange = (inputType, inputValue) => {
        setProfile({ ...profile, [inputType]: inputValue })
    }

    const handleSelectTag = (selectedTagType, selectedTag) => {
        profile[selectedTagType].some(tag => tag === selectedTag)
            ? setProfile({ ...profile, [selectedTagType]: profile[selectedTagType].filter(tag => tag !== selectedTag) })
            : setProfile({ ...profile, [selectedTagType]: [...profile[selectedTagType], selectedTag] })
    }

    const handleIsSelected = (selectedTagType, selectedTag) => {
        return profile[selectedTagType].some(tag => tag === selectedTag)
    }

    // TODO : update database with new group profile data
    const handleApplyChangesSubmit = () => {
        console.log(profile)
        onGroupProfileDataChange(profile)
        setProfile(prevGroupProfileData)
    }

    const handleClose = () => {
        // clear unsaved changes
        setProfile(prevGroupProfileData)
    }

    const formatTagType = (text) => {
        return text
            // insert a space between each word
            .replace(/([A-Z])/g, ' $1')
            // uppercase first character of each word
            .replace(/^./, (str) => str.toUpperCase())
    }

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
                        <div className="modal-body d-flex flex-column align-items-start text-start gap-4">

                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="name"><strong>Name</strong></label>
                                <input type="text" value={profile.name} onChange={(e) => handleInputChange("name", e.target.value)} className="form-control" id="name" placeholder="Enter name..." />
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
                            </div>
                            {/* TODO : select from all available study areas in database */}
                            <div className="form-group d-flex flex-column w-50">
                                <label htmlFor="studyArea"><strong>Study Area</strong></label>
                                <input type="text" value={profile.studyArea} onChange={(e) => handleInputChange("studyArea", e.target.value)} className="form-control" id="studyArea" placeholder="Enter study area..." />
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
                                            <div key={tag}><SelectableTag name={tag} onSelectTag={() => { handleSelectTag(tagType, tag) }} isSelected={handleIsSelected(tagType, tag)} /></div>
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
