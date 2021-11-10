import * as allTypes from './Types';

export const getUserDataByEmail = (data) => {
    return {
        type: allTypes.types.GET_USER_DATA_BY_EMAIL,
        payload: data
    };
};
