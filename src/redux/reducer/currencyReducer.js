import CurrencyConstant from '../constant/constant_currency';

const initialState = { isUpdating: false, isUpdated: false, currencies:[] }
export function Currency(state = initialState, action) {
  switch (action.type) {
    case CurrencyConstant.CURRENCY_UPDATING:
      return {...state, isUpdating: true, isUpdated: false,}
    case CurrencyConstant.CURRENCY_UPDATED:
      return {...state, isUpdating: false, isUpdated: true, currencies: action.payload }
    default:
      return state
  }
}
