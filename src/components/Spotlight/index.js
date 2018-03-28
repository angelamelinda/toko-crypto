import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

class Spotlight extends Component {
  constructor(props){
    super(props);
    this.state ={

    }
  }
  componentWillUpdate(nextProps,NextState){
    this.sortAndSliceCurrency(nextProps,NextState);
  }
  sortAndSliceCurrency(nextProps,NextState){
      let col = 'percent_change_24h';
      NextState.high = nextProps.currencyInformation.sort(function(a,b) {
        return b[col] - a[col];
      }).slice(0,5);
      NextState.low = nextProps.currencyInformation.sort(function(a,b) {
        return a[col] - b[col];
      }).slice(0,5);
  }

  render() {
    return (
      <div className="row mt-4">
        <div className="col-12 mb-4">
          <h2 className="text-center font-weight-normal mb-0">Market Spotlight</h2>
        </div>
        <div className="col-12 text-right">
          { this.props.isLoggedIn &&
            <h4>Balance: IDR {Number.parseFloat(this.props.balanceInformation_idr).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</h4>
          }
        </div>
        <div className="col-12 col-xl-6">
          <table className="table-spotlight">
            <thead>
              <tr className="border-bottom">
                <th>Nama</th>
                <th>Harga</th>
                <th>Change(24h)</th>
              </tr>
            </thead>
            <tbody>
              { this.state.high!= undefined && this.state.high.map((item, index) => (
              <tr key={index} id={item.id}>
                <td>{item.name} ({item.symbol})</td>
                <td>IDR {Number.parseFloat(item.price_idr).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</td>
                <td><span className={item.percent_change_24h >=0 ? "color-green" : "color-red"}>{item.percent_change_24h}%</span></td>
              </tr>
          ))}
            </tbody>
         </table>
        </div>
        <div className="col-12 col-xl-6">
          <table className="table-spotlight">
            <thead>
              <tr className="border-bottom">
                <th>Nama</th>
                <th>Harga</th>
                <th>Change(24h)</th>
              </tr>
            </thead>
            <tbody>
            { this.state.low != undefined && this.state.low.map((item, index) => (
              <tr key={index} id={item.id}>
                <td>{item.name} ({item.symbol})</td>
                <td>IDR {Number.parseFloat(item.price_idr).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</td>
                <td><span className={item.percent_change_24h >=0 ? "color-green" : "color-red"}>{item.percent_change_24h}%</span></td>
              </tr>)
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    currencyInformation: state.Currency.currencies,
    balanceInformation_idr: state.Balance.balanceInformation.balanceIDR,
    isLoggedIn: state.User.isLoggedIn
  }
}

export default connect(mapStateToProps)(Spotlight);
