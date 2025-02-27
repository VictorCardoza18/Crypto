import { useNavBar } from '../../../hooks'

export const LogOutOption = () => {
    const { onLogOut } = useNavBar()

    return (
        <li>
            <button type="button" onClick={onLogOut} className={`w-full text-start block py-2 px-3 rounded text-gray-900 hover:bg-red-500 dark:text-gray-400 dark:hover:bg-red-500 dark:hover:text-white`}>Logout</button>
        </li>
    )
}