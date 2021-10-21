import * as allTypes from './Types';

export const setLevel = (data) => {
    return {
        type: allTypes.types.SET_LEVEL,
        payload: data
    };
};
