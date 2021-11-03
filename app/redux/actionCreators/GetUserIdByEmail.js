import * as allTypes from './Types';

export const getUserIdByEmail = (data) => {
    return {
        type: allTypes.types.GET_USER_ID_BY_EMAIL,
        payload: data
    };
};
