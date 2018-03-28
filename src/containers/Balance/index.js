import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import './style.css';

class Balance extends Component{
  render(){
    var balancecoin = this.props.balanceInformation.balanceCoin;
    if (this.props.balanceInformation === {} || !this.props.isLoggedIn ) {
      return(
        <Redirect to="/"/>
      );
    }

    return (
      <div id="balance">
        <div className="content">
          <div className="container">
            <ul className="nav nav-tabs mt-4" role="tablist">
              <li className="nav-item">
                <a id="list-balance-tab" className="nav-link active" href="#list-balance" data-toggle="tab" role="tab" aria-controls="list-balance" aria-selected="true">Balance</a>
              </li>
              <li className="nav-item">
                <a id="list-history-tab" className="nav-link" href="#list-history" data-toggle="tab"  role="tab" aria-controls="list-history" aria-selected="true">History</a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="list-balance" className="tab-pane fade show active" role="tabpanel" aria-labelledby="list-balance-tab">
                <table>
                  <thead className="border-bottom">
                    <tr>
                      <th>Nama</th>
                      <th>Jumlah Coin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(balancecoin).map((key,index) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{balancecoin[key]}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div id="list-history" className="tab-pane fade show" role="tabpanel" aria-labelledby="list-history-tab">
                <table>
                  <thead className="border-bottom">
                    <tr>
                      <th>Nama</th>
                      <th>Harga Coin</th>
                      <th>Jumlah Coin Beli</th>
                      <th>Jumlah Coin Setelah Beli</th>
                      <th>Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.props.balanceInformation.balanceHistory.map((item, index) => (
                      <tr>
                        <td>{item.coinName}</td>
                        <td>IDR {Number.parseFloat(item.coinPrice).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</td>
                        <td>{item.coinAmount}</td>
                        <td>{item.coinThen}</td>
                        <td>{
                          new Date( item.orderTime ).toLocaleString('id-ID')
                        }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=> {
  return {
    balanceInformation: state.Balance.balanceInformation,
    isLoggedIn: state.User.isLoggedIn
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
  };
}
const BalancePage = connect(mapStateToProps,matchDispatchToProps)(Balance);

export default BalancePage;
