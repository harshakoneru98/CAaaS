import { getUserIdByEmail } from './GetUserIdByEmail';

const UserIdEmailThunk = (email) => {
    return (dispatch) => {
        fetch('/api/getUserIdByEmail?email=' + email)
            .then((res) => res.json())
            .then((res) => {
                dispatch(getUserIdByEmail(res.data));
            });
    };
};

export default UserIdEmailThunk;
