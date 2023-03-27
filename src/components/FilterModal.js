import React, { useState } from 'react'
import { useTags } from './Tag'
import { LoadingSpinner } from './LoadingSpinner'
import { SelectableTag, DisplayTag, formatTagType } from './Tag'

export function FilterModal({ onFilterTagsChange, prevFilterTags }) {
    const [selectedTags, setSelectedTags] = useState([])
    const { data: tagData, error, isLoading: tagDataIsLoading } = useTags()

    const handleSelectTag = (tag) => {
        selectedTags.some(selectedTag => selectedTag === tag)
            // remove tag if already selected
            ? setSelectedTags(prevState => prevState.filter(selectedTag => selectedTag !== tag))
            // add tag if not yet selected
            : setSelectedTags(prevState => ([...prevState, tag]))
    }

    const handleResetSubmit = (e) => {
        setSelectedTags([])
    }

    const handleApplyFiltersSubmit = () => {
        onFilterTagsChange(selectedTags)
    }

    const handleClose = () => {
        setSelectedTags(prevFilterTags)
    }

    return (
        <div>
            {/* Modal Button */}
            <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase"
                data-bs-toggle="modal" data-bs-target="#filterModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                </svg>
                <span>Filter</span>
            </button>

            {/* Modal */}
            <div className="modal fade" id="filterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="p-4 modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3 className="modal-title" id="FilterModalLabel"><strong>Filters</strong></h3>
                            <button onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body d-flex flex-column align-items-start gap-4">
                            {tagDataIsLoading && <LoadingSpinner />}
                            {tagData && Object.entries(tagData).map(([tagType, tags]) => (
                                <div key={tagType} className="d-flex flex-column align-items-start">
                                    <span><strong>{formatTagType(tagType)}</strong></span>

                                    <div className="d-flex flex-wrap gap-2">
                                        {tags.map((tag) =>
                                            <div key={tag}><SelectableTag name={tag} onSelectTag={handleSelectTag} isSelected={selectedTags.some(selectedTag => selectedTag === tag)} /></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer d-flex flex-column align-items-start">
                            <h5 className="fs-5"><strong>Selected</strong></h5>
                            <div className="d-flex flex-wrap gap-2">
                                {selectedTags.map((tag) =>
                                    <div key={tag}><DisplayTag name={tag} /></div>
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
