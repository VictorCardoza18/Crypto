import { Navigate, Outlet } from 'react-router'
import { useAuth } from './hooks'

export const ProtectedRoutes = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) return <h1>Loading...</h1>
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />
    return <Outlet />
}
