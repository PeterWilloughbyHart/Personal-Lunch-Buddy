import { createStore , combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import auth from './Ducks/UserAuth';

const rootReducer = combineReducers({auth});

const store = createStore(rootReducer, applyMiddleware(promise));

export default store;