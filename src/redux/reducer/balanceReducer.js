import BalanceConstant from '../constant/constant_balance';

const initialState = { isChanging: false, isDeducted: false, isIncreased: false, balanceInformation:{} }
export function Balance(state = initialState, action) {
  switch (action.type) {
    case BalanceConstant.BALANCE_DEDUCTING:
      return {...state, isChanging: true, isDeducted: false }
    case BalanceConstant.BALANCE_DEDUCTED:
      return {...state, isChanging: false, isDeducted: true, balanceInformation: action.payload }
    case BalanceConstant.BALANCE_FAILED_DEDUCTED:
      return {...state, isChanging: false, isDeducted: false }
    case BalanceConstant.BALANCE_INCREASING:
      return {...state, isChanging: true, isDeducted: false }
    case BalanceConstant.BALANCE_INCREASED:
      return {...state, isChanging: false, isIncreased: true, balanceInformation: action.payload }
    case BalanceConstant.BALANCE_FAILED_INCREASED:
      return {...state, isChanging: false, isIncreased: false }
    case BalanceConstant.BALANCE_RESET:
      return {...state, isChanging: false, isDeducted: false, isIncreased: false}
    default:
      return state
  }
}
