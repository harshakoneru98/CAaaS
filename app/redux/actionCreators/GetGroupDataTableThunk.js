import { getGroupDataTable } from './GetGroupDataTable';

const GetGroupDataTableThunk = (email) => {
    let params = {
        email: email,
        type: 'table'
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
                dispatch(getGroupDataTable(data));
            });
    };
};

export default GetGroupDataTableThunk;
