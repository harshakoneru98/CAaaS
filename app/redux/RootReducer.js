import { combineReducers } from 'redux';
import MainViewReducer from './Reducers/MainReducer';
import UserDataEmailReducer from './Reducers/UserDataEmailReducer';

/**
 * TODO: Add as many reducers as you want depending on requirement, and combine them here.
 * All the combined reducers will be pointed to src/Store/store.js file.
 * Which will initialise the store object that is injected to the Provider at root element(_app.js) which will be available during the initial mount (componentDidMount)
 */

const ReduxReducer = combineReducers({
    MainViewReducer,
    UserDataEmailReducer
});

export default ReduxReducer;
