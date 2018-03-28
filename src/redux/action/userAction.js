import UserConstant from '../constant/constant_user';
import BalanceConstant from '../constant/constant_balance';
import bcrypt from 'bcryptjs';

export function RequestLogin(credential){
  return dispatch => {
    dispatch({type:UserConstant.USER_LOGIN_REQUEST});

    var users = localStorage.getItem('users');
    users = JSON.parse(users);
    if(users == undefined || typeof users === "string"){
      users = {};
      return dispatch({type:UserConstant.USER_LOGIN_FAILURE});
    } else {
      var userinfo = users[credential.email];
      if (userinfo != undefined && bcrypt.compareSync(credential.password, userinfo.password)) {
        let balanceInfo = {
          balanceIDR: 10000000.0,
          balanceCoin: {},
          balanceHistory:[]
        };

        dispatch({type:BalanceConstant.BALANCE_INCREASED,payload:balanceInfo});
        return dispatch({type:UserConstant.USER_LOGIN_SUCCESS, payLoad:userinfo});
      } else {
        return dispatch({type:UserConstant.USER_LOGIN_FAILURE});
      }
    }
  }
}

export function RequestLogout(){
  return dispatch => {
    dispatch({type:UserConstant.USER_LOGOUT});
  }
}

export function RequestRegister(credential){
  return dispatch => {
    dispatch({type:UserConstant.USER_REGISTER_REQUEST});
    var users = localStorage.getItem('users');
    if (users == undefined || typeof users == "string") {
      users = {};
    }
    credential.password = bcrypt.hashSync(credential.password,10);
    var mail = credential.email;
    users[mail] = {
      email:credential.email,
      password:credential.password,
      username:credential.username
    };
    localStorage.setItem('users',JSON.stringify(users));
    dispatch({type:UserConstant.USER_REGISTER_SUCCESS, payLoad:credential});
  }
}
