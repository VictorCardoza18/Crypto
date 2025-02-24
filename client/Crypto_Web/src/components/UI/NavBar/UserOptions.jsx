import PropTypes from 'prop-types';
import { LabelOptionMenu } from './LabelOptionMenu';

export const UserOptions = ({ routes }) => {

    return (
        <>
            {routes?.map((route, index) => {
                return (
                    <LabelOptionMenu key={index} route={route} />
                )
            })}
        </>
    )
}

UserOptions.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.string).isRequired,
};