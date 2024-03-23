import React from 'react'
import Signup from "../features/auth/components/Signup"
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function SignupPage() {
    const user = useSelector(state => state.auth.user)
    const location = useLocation()
    return (
        <>
            {user ? <Navigate to={location.state?.next || "/"} /> : <Signup />}
        </>
    )
}
