import {combineReducers} from 'redux';
import contactReducers from './contact';
export default combineReducers({
  contact: contactReducers,
});
