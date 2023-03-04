import React, { useState } from 'react'
import { GroupSelectableTag, GroupDisplayTag } from './GroupTag'

export function FilterModal({ onFilterTagsChange, prevFilterTags, tagData }) {
    const [selectedTags, setSelectedTags] = useState([])

    const handleSelectTag = (tag) => {
        selectedTags.some(selectedTag => selectedTag === tag)
            // remove tag if already selected
            ? setSelectedTags(prevState => prevState.filter(selectedTag => selectedTag !== tag))
            // add tag if not yet selected
            : setSelectedTags(prevState => ([...prevState, tag]))
    }

    const handleResetSubmit = (e) => {
        e.preventDefault()
        setSelectedTags([])
    }

    const handleApplyFiltersSubmit = () => {
        onFilterTagsChange(selectedTags)
    }

    const handleClose = () => {
        setSelectedTags(prevFilterTags)
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
            <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase"
                data-bs-toggle="modal" data-bs-target="#modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                </svg>
                <span>Filter</span>
            </button>

            <div className="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="p-4 modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalLabel"><strong>Filters</strong></h3>
                            <button onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-start gap-4">
                            {Object.entries(tagData).map(([tagType, tags]) => (
                                <div key={tagType} className="d-flex flex-column align-items-start">
                                    <span><strong>{formatTagType(tagType)}</strong></span>
                                    <div className="d-flex flex-wrap gap-2">
                                        {tags.map((tag) =>
                                            <div key={tag}><GroupSelectableTag name={tag} onSelectTag={handleSelectTag} isSelected={selectedTags.some(selectedTag => selectedTag === tag)} /></div>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="modal-footer d-flex flex-column align-items-start">
                            <h5 className="fs-5"><strong>Selected</strong></h5>
                            <div className="d-flex flex-wrap gap-2">
                                {selectedTags.map((tag) =>
                                    <div key={tag}><GroupDisplayTag name={tag} /></div>
                                )}
                            </div>
                            <div className="mt-5 d-flex gap-3">
                                <button onClick={handleApplyFiltersSubmit} type="button" className="btn p-3 btn-primary text-uppercase" data-bs-dismiss="modal">Apply Filters</button>
                                <button onClick={handleResetSubmit} type="button" className="btn p-3 btn-secondary text-light text-uppercase">Reset Selection</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
