import UserConstant from '../constant/constant_user';

const initialState = { isLogging: false, isLoggedIn: false, isRegistering: false, userInformation:{}, isFailed:false }

export function User(state = initialState, action) {
  switch (action.type) {
    case UserConstant.USER_LOGIN_REQUEST:
      return {...state, isLogging: true, isLoggedIn: false,}
    case UserConstant.USER_LOGIN_SUCCESS:
      return {...state, isLogging: false, isLoggedIn: true, userInformation: action.payLoad}
    case UserConstant.USER_LOGIN_FAILURE:
      return {...state, isLogging: false, isLoggedIn: false, isFailed: true}

    case UserConstant.USER_LOGOUT:
      return {...state, isLogging: false, isLoggedIn: false, userInformation:{} }

    case UserConstant.USER_REGISTER_REQUEST:
      return {...state, isRegistering: true, isLoggedIn: false,}
    case UserConstant.USER_REGISTER_SUCCESS:
      return {...state, isRegistering: true, isLoggedIn: true, userInformation: action.payLoad}
    case UserConstant.USER_REGISTER_FAILURE:
      return {...state, isRegistering: false, isLoggedIn: false,}
    default:
      return state
  }
}
