import React from 'react';
import { types } from '../actionCreators/Types';

const initialState = {
    userId: ''
};

const UserIdEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_ID_BY_EMAIL:
            return {
                ...state,
                userId: action.payload
            };
        default:
            return state;
    }
};

export default UserIdEmailReducer;
