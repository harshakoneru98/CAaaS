import { getGroupData } from './GetGroupData';

const UserDataEmailThunk = (email, type) => {
    let params = {
        email: email,
        type: type
    };
    return (dispatch) => {
        fetch('/api/getScoreData', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(getGroupData(data));
            });
    };
};

export default UserDataEmailThunk;
