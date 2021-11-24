import { getGroupDataImage } from './GetGroupDataImage';

const GetGroupDataImageThunk = (email) => {
    let params = {
        email: email,
        type: 'image'
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
                dispatch(getGroupDataImage(data));
            });
    };
};

export default GetGroupDataImageThunk;
