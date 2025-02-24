import { Link } from "react-router"
import { useAuth } from "../../../hooks"

export const DefaultMenuOptions = () => {
    const { menuState, setMenuState } = useAuth()
    return (
        <>
            <li>
                <Link to="/login" onClick={() => setMenuState('login')} className={`block py-2 px-3  rounded  ${menuState === 'login' ? 'bg-blue-700 dark:bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-600 dark:hover:text-white'}`}>Login</Link>
            </li>
            <li>
                <Link to="/register" onClick={() => setMenuState('register')} className={`block py-2 px-3  rounded  ${menuState === 'register' ? 'bg-blue-700 dark:bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-600 dark:hover:text-white'}`}>Register</Link>
            </li>
        </>
    )
}