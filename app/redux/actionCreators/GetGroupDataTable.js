import * as allTypes from './Types';

export const getGroupDataTable = (data) => {
    return {
        type: allTypes.types.GET_GROUP_DATA_TABLE,
        payload: data
    };
};
