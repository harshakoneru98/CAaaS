import * as allTypes from './Types';

export const getGroupDataImage = (data) => {
    return {
        type: allTypes.types.GET_GROUP_DATA_IMAGE,
        payload: data
    };
};
