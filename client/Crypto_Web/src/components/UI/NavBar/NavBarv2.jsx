import { Link } from "react-router"
import { useAuth } from "../../../hooks"
import { DefaultMenuOptions } from "./DefaultMenuOptions"
import { UserLabelDispaly } from "./UserLabelDispaly"
import { LogOutOption } from "./LogOutOption"
import { UserOptions } from "./UserOptions"

export const NavBarv2 = () => {

    const { menuState, setMenuState, isAuthenticated, isAdmin } = useAuth()
    const menuOptions = ['PracticaCero: Corrimiento']

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-zinc-700 dark:border-gray-700 rounded-md my-3">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">Crypto Web</span>
                </Link>

                {isAuthenticated && <UserLabelDispaly />}

                <button data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                    <span className="sr-only">Abrir menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full" id="navbar-hamburger">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-zinc-700 dark:border-gray-700">
                        <li>
                            <Link to="/" onClick={() => setMenuState('')} className={`block py-2 px-3  rounded  ${menuState === '' ? 'bg-blue-700 dark:bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-600 dark:hover:text-white'}`}>Home</Link>
                        </li>
                        {(isAuthenticated && !isAdmin) && (
                            <>
                                <UserOptions routes={menuOptions} />
                                <LogOutOption />
                            </>
                        )}
                        {(isAdmin && isAuthenticated) && (
                            <>
                                <li><Link to="/usuarios" onClick={() => setMenuState('usuarios')} className={`block py-2 px-3  rounded  ${menuState === 'usuarios' ? 'bg-blue-700 dark:bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-600 dark:hover:text-white'}`}>Usuarios</Link></li>
                                <LogOutOption />
                            </>
                        )}
                        {
                            !isAuthenticated && (<DefaultMenuOptions />)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
