import React from 'react'
import Login from '../features/auth/components/Login'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function LoginPage() {
    const user = useSelector(state => state.auth.user)
    const location = useLocation()
    return (
        <>
            {user ? <Navigate to={location.state?.next || "/"} /> : <Login />}
        </>
    )
}
