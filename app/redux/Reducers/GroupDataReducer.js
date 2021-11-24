import React from 'react';
import { types } from '../actionCreators/Types';

const initialState = {
    groupData: ''
};

const GroupDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_GROUP_DATA:
            return {
                ...state,
                groupData: action.payload
            };
        default:
            return state;
    }
};

export default GroupDataReducer;
