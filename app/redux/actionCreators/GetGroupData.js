import * as allTypes from './Types';

export const getGroupData = (data) => {
    return {
        type: allTypes.types.GET_GROUP_DATA,
        payload: data
    };
};
