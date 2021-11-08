import React from 'react';
import { types } from '../actionCreators/Types';

const initialState = {
    userData: ''
};

const UserDataEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_DATA_BY_EMAIL:
            return {
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
};

export default UserDataEmailReducer;
