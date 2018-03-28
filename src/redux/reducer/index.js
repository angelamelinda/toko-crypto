import { combineReducers } from 'redux';

import { Currency } from './currencyReducer.js';
import { User } from './userReducer.js';
import { Balance } from './balanceReducer.js';

const RootReducer = combineReducers({
  Currency,
  User,
  Balance
})

export default RootReducer;
