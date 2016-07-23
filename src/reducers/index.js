import {combineReducers} from 'redux';
import carousel from './carousel';
import paintings from './paintings';

export default combineReducers({
    carousel,
    paintings
});