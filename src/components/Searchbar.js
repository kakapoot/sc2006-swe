import React from 'react'
import { FilterModal } from './FilterModal'

/* Component for search bar */
export function Searchbar({ searchText, onSearchTextChange, onSearch, onFilterTagsChange, prevFilterTags }) {
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <div className="my-5 d-flex justify-content-between">
            <form className="form w-75 gap-3 d-flex align-items-center">
                <input type="text" value={searchText} onChange={(e) => onSearchTextChange(e.target.value)} className="form-control h-100" placeholder="Search..." aria-label="Search" />

                <button onClick={handleSearchSubmit} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <span>Search</span>
                </button>
            </form>

            <FilterModal onFilterTagsChange={onFilterTagsChange}
                prevFilterTags={prevFilterTags} />
        </div>
    )
}
