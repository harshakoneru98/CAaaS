import React from 'react';
import { types } from '../actionCreators/Types';

const initialState = {
    groupImageData: ''
};

const GroupDataImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_GROUP_DATA_IMAGE:
            return {
                ...state,
                groupImageData: action.payload
            };
        default:
            return state;
    }
};

export default GroupDataImageReducer;
