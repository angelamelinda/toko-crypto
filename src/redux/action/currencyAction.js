import CurrencyConstant from '../constant/constant_currency';
import axios from 'axios';

export function RequestCurrencyUpdate(){
  return dispatch => {
    dispatch({type:CurrencyConstant.CURRENCY_UPDATING});
    axios.get(`https://api.coinmarketcap.com/v1/ticker/?convert=IDR`)
     .then(resp => {
       console.log(resp);
       dispatch({type:CurrencyConstant.CURRENCY_UPDATED,payload:resp.data});
     }).catch(resp => {
       dispatch({type:CurrencyConstant.CURRENCY_UPDATED,payload:[]});
       console.log(resp);
   });
  }
}
