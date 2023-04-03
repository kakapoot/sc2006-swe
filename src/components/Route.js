import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

/* Route that requires user to be logged in */
export function PrivateRoute() {
    const { user } = useContext(AuthContext)

    // redirect unauthenticated user to login page 
    if (!user) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

/* Route that does not require user to be logged in */
export function PublicRoute() {
    const { user } = useContext(AuthContext)

    // redirect authenticated user to main app page 
    if (user) {
        return <Navigate to='/my_groups' replace />
    }

    return <Outlet />
}

