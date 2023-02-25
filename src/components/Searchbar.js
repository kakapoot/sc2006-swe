import React from 'react'

export function Searchbar() {
    const handleSearch = (e) => {
        e.preventDefault();
    }

    // TODO: filter modal
    const handleFilter = (e) => {
    }


    return (
        <div className="my-5 d-flex justify-content-between">
            <form className="form w-75 gap-3 d-flex align-items-center">

                <input type="text" className="form-control h-100" placeholder="Search..." aria-label="Search" />
                <button onClick={handleSearch} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <span>Search</span>
                </button>
            </form>

            <button onClick={handleFilter} className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                </svg>
                <span>Filter</span>
            </button>
        </div>
    )
}
