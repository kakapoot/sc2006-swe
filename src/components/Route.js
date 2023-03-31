import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export function PrivateRoute() {
    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export function PublicRoute() {
    const { user } = useContext(AuthContext)

    if (user) {
        return <Navigate to='/my_groups' replace />
    }

    return <Outlet />
}

