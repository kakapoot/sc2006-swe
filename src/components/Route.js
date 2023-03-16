import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useEffect } from 'react'

export function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to='/' replace />
    }

    return children ? children : <Outlet />
}

export function PublicRoute({ children }) {
    const { user } = useContext(AuthContext)

    if (user) {
        return <Navigate to='/my_groups' replace />
    }

    return children ? children : <Outlet />
}

