import React from 'react';

// Component for displaying a tag
export function DisplayTag({ name }) {
    return (
        <button className="disabled btn btn-warning py-0 text-uppercase">
            <strong>{name}</strong>
        </button>
    )
}

// Component for displaying a tag that is selectable
export function SelectableTag({ name, isSelected, onSelectTag }) {
    const handleClick = () => {
        onSelectTag(name)
    }

    return (
        <button type="button" onClick={handleClick} className={isSelected ? "btn btn-danger py-0 text-light text-uppercase" : "btn btn-warning py-0 text-uppercase"}>
            <strong>{name}</strong>
        </button>
    )
}

// Formats tag type eg. "tagType" to "Tag Type"
export function formatTagType(text) {
    return text
        // insert a space between each word
        .replace(/([A-Z])/g, ' $1')
        // uppercase first character of each word
        .replace(/^./, (str) => str.toUpperCase())
}

// Edit tags in profile based on selected tag
export function handleSelectTag(profile, setProfile, selectedTagType, selectedTag) {
    return profile["tags"][selectedTagType].some(tag => tag === selectedTag)
        // if selected tag is already in the tag list for the respective tag type, then remove selected tag from list
        ? setProfile({ ...profile, "tags": { ...profile["tags"], [selectedTagType]: profile["tags"][selectedTagType].filter(tag => tag !== selectedTag) } })
        // if selected tag is not in tag list, then add selected tag to list  
        : setProfile({ ...profile, "tags": { ...profile["tags"], [selectedTagType]: [...profile["tags"][selectedTagType], selectedTag] } })
}

// Check whether selected tag is already in the tags
export function handleIsSelected(profile, selectedTagType, selectedTag) {
    return profile["tags"][selectedTagType].some(tag => tag === selectedTag)
}