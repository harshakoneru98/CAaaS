import React from 'react';
import { types } from '../actionCreators/Types';

const initialState = {
    groupTableData: ''
};

const GroupDataTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_GROUP_DATA_TABLE:
            return {
                ...state,
                groupTableData: action.payload
            };
        default:
            return state;
    }
};

export default GroupDataTableReducer;
