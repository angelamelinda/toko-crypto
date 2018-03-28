import BalanceConstant from '../constant/constant_balance';

export function RequestBuyCoin(priceIDR, coinAmount, coinName, balanceInformation){
  return dispatch => {
    dispatch({type:BalanceConstant.BALANCE_DEDUCTING});
    const totalPrice = priceIDR * coinAmount;
    var balanceIDR_now = balanceInformation.balanceIDR;
    if ( balanceIDR_now < totalPrice ) {
      return dispatch({type:BalanceConstant.BALANCE_FAILED_DEDUCTED})
    } else {
      let balanceCoin_now = balanceInformation.balanceCoin[coinName] == undefined ? 0.0 : balanceInformation.balanceCoin[coinName];
      let balanceIDR_new = balanceIDR_now - totalPrice;
      let balanceCoin_new = balanceCoin_now + coinAmount;

      const newBalanceHistory = {
        coinAmount: coinAmount,    // jumlah koin dibeli
        coinPrice: priceIDR,       // harga koin to IDR
        coinName: coinName,        // id coin
        coinThen: balanceCoin_new, // jumlah koin setelah pembelian
        IDRThen: balanceIDR_new,   // jumlah uang setelah pembelian
        orderTime: Date.now(),     // waktu pembelian
        orderType: "Beli"          // tipe
      };

      balanceInformation.balanceIDR = balanceIDR_new;
      balanceInformation.balanceCoin[coinName] = balanceCoin_new;
      balanceInformation.balanceHistory = [
        newBalanceHistory,
        ...balanceInformation.balanceHistory
      ];

      dispatch({type:BalanceConstant.BALANCE_DEDUCTED, payload:balanceInformation});
    }

  }
}

export function RequestSellCoin(priceIDR, coinAmount, coinName, balanceInformation){
  return dispatch => {
    dispatch({type:BalanceConstant.BALANCE_DEDUCTING});
    const totalPrice = priceIDR * coinAmount;
    var balanceCoin_now = balanceInformation.balanceCoin[coinName] == undefined ? 0.0 : balanceInformation.balanceCoin[coinName];
    if ( balanceCoin_now < coinAmount ) {
      return dispatch({type:BalanceConstant.BALANCE_FAILED_INCREASED})
    } else {
      let balanceCoin_new = balanceCoin_now - coinAmount;
      let balanceIDR_now = balanceInformation.balanceIDR;
      let balanceIDR_new = balanceIDR_now + totalPrice;

      const newBalanceHistory = {
        coinAmount: coinAmount,   // jumlah koin dibeli
        coinPrice: priceIDR,      // harga koin to IDR
        coinName: coinName,       // id coin
        coinThen: balanceCoin_new,// jumlah koin setelah pembelian
        IDRThen: balanceIDR_new,  // jumlah uang setelah pembelian
        orderTime: Date.now(),    // waktu pembelian
        orderType: "Jual"         // tipe
      };

      balanceInformation.balanceIDR = balanceIDR_new;
      balanceInformation.balanceCoin[coinName] = balanceCoin_new;
      balanceInformation.balanceHistory = [
        newBalanceHistory,
        ...balanceInformation.balanceHistory
      ];

      dispatch({type:BalanceConstant.BALANCE_INCREASED, payload:balanceInformation});
    }

  }
}

export function RequestResetDeducted() {
  return dispatch => {
    dispatch({type:BalanceConstant.BALANCE_RESET});
  }
}
