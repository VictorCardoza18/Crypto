import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { registerRequest, loginRequest, verifyTokenRequest } from '../../api'
import Cookies from 'js-cookie'

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    const [menuState, setMenuState] = useState('')
    const homeRoute = ''

    const checkLogin = async () => {
        const cookies = Cookies.get()

        if (!cookies.token) {
            console.log('No token provided')
            setIsAuthenticated(false)
            setLoading(false)
            setUser(null)
            setIsAdmin(false);
            return
        }

        try {
            const res = await verifyTokenRequest(cookies.token)
            if (!res.data) {
                setIsAuthenticated(false)
                setLoading(false)
                setIsAdmin(false);
                return
            }
            setIsAuthenticated(true)
            setUser(res.data)
            setIsAdmin(res.data.isAdmin || false);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
            setUser(null)
            setIsAdmin(false);
            setLoading(false)
        }

    }

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setMenuState(homeRoute)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user)

            setIsAuthenticated(true)
            setUser(res.data)

            if (res.data.isAdmin) {
                setIsAdmin(true)
                setMenuState('usuarios')
            } else {
                setIsAdmin(false)
                setMenuState(homeRoute)
            }

        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const logout = () => {
        Cookies.remove('token')
        setMenuState(homeRoute)
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => { setErrors([]) }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => { checkLogin() }, [])

    return (
        <AuthContext.Provider value={{ logout, signUp, signIn, user, isAuthenticated, errors, loading, menuState, setMenuState, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}