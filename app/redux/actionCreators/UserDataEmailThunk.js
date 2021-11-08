import { getUserDataByEmail } from './GetUserDataByEmail';

const UserDataEmailThunk = (email) => {
    return (dispatch) => {
        fetch('/api/getUserDataByEmail?email=' + email)
            .then((res) => res.json())
            .then((res) => {
                dispatch(getUserDataByEmail(res.data));
            });
    };
};

export default UserDataEmailThunk;
