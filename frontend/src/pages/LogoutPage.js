import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice';

export default function LogoutPage() {
    const dispatch = useDispatch();
    dispatch(logout())
    return (
        <>
            { localStorage.getItem("token") ? <h1>Logging out...</h1> : <Navigate to="/" /> }
        </>
    )
}
