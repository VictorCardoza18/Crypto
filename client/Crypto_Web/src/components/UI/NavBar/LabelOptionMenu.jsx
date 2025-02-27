import PropTypes from 'prop-types';
import { Link } from "react-router"
import { useAuth } from "../../../hooks"

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const LabelOptionMenu = ({ route }) => {
    const { setMenuState, menuState } = useAuth()

    return (
        <Link to={'/' + route} onClick={() => setMenuState(route)} className={`block py-2 px-3  rounded  ${menuState === route ? 'bg-blue-700 dark:bg-blue-600 text-white' : 'text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-600 dark:hover:text-white'}`}>{capitalize(route)}</Link>
    )
}

LabelOptionMenu.propTypes = {
    route: PropTypes.string.isRequired,
};