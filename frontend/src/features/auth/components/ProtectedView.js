import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedView({ children }) {
    const { user } = useSelector(state => state.auth)
    const location = useLocation()
    return (
        <>
            {user ? children : <Navigate to="/login" state={{ next: location.pathname }} />}
        </>
    )
}
