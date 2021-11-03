import React from 'react';
import { types } from '../actionCreators/Types';

const initialState = {
    level: ''
};

/**
 * Main Reducer that handles the level of context.
 * @param {Object} state
 * @param {Object} action
 * @returns {React.ReactNode}
 */

/**
 *
 * TODO: add action types based on requirement, always use spread operatore before returning the state object, helps in automatic mutation of previous state with the current state update.
 */
const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LEVEL:
            return {
                ...state,
                level: action.payload
            };
        default:
            return state;
    }
};

export default MainReducer;
