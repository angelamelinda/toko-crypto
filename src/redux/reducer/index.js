import { combineReducers } from 'redux';

import { Currency } from './currencyReducer.js';
import { User } from './userReducer.js';

const RootReducer = combineReducers({
  Currency,
  User
})

export default RootReducer;
