import React , { Component } from 'react';
import { connect } from 'react-redux';
import {RequestCurrencyUpdate} from '../../redux/action/currencyAction';
import './style.css';

class Currencies extends Component {
  constructor(props) {
      super(props)

      this.state = {
        currencies: [],
        sortBy: {
          column: 'rank',
          sortType: 'asc',
        }
      }

      this.handle_sort = this.handle_sort.bind(this);
      this.sortCurrency = this.sortCurrency.bind(this);
  }
  handle_sort = (e) => {
    e.preventDefault();
    var columnName = e.target.dataset.sort;
    if(this.state.sortBy.column == columnName) {
      var nextSortType = this.state.sortBy.sortType == "desc" ? "asc" : "desc";
      this.setState({
        sortBy:{
          column:columnName,
          sortType: nextSortType
        }
      })
    } else {
      this.setState({
        sortBy:{
          column: columnName,
          sortType:"asc"
        }
      })
    }
  }
  componentWillMount(){
    this.props.RequestCurrencyUpdate();
  }

  componentWillUpdate(nextProps,NextState){
    this.sortCurrency(nextProps,NextState);
  }

  sortCurrency(nextProps,NextState){
    if (NextState.column != "") {
      var col = NextState.sortBy.column;
      nextProps.currencies.sort(function(a,b) {
        switch (col) {
          case "name":
            if (NextState.sortBy.sortType == "desc")
              return b[col].localeCompare(a[col]);
            else
              return a[col].localeCompare(b[col]);
            break;
          case "price_idr":
          case "percent_change_24h":
          case "24h_volume_idr":
          case "rank":
            if (NextState.sortBy.sortType == "desc")
              return b[col] - a[col];
            else
              return a[col] - b[col];
            break;
          default:
            return true;
            break;
        }
      });
    }
  }

  componentDidMount() {
    // let callback = ;
    setInterval(this.props.RequestCurrencyUpdate,50000);
  }

  render() {
    return(
      <div id="currencies">
        <div className="content">
          <div className="container">
            <h2 className="text-center font-weight-normal mb-4 mt-4">Currencies</h2>
            <table id="list-currencies">
              <thead className="border-bottom">
                <tr>
                  <th className={this.state.sortBy.column == "rank" ? "active" : "" }>
                    <span>Rank</span>
                    <button data-sort="rank" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer float-right ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "name" ? "active" : "" }>
                    <span>Currency</span>
                    <button data-sort="name" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer float-right ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "price_idr" ? "active" : "" }>
                    <span>Harga</span>
                    <button data-sort="price_idr" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer float-right ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "percent_change_24h" ? "active" : "" }>
                    <span>Change(24h)</span>
                    <button data-sort="percent_change_24h" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer float-right ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "24h_volume_idr" ? "active" : "" }>
                    <span>Volume(24h)</span>
                    <button data-sort="24h_volume_idr" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer float-right ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { this.props.currencies.map((item, index) => (
                  <tr key={index}>
                    <td>{item.rank}</td>
                    <td>{item.name} ({item.symbol})</td>
                    <td>IDR {Number.parseFloat(item.price_idr).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</td>
                    <td>{item.percent_change_24h}%</td>
                    <td>{Number.parseFloat(item["24h_volume_idr"]).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</td>
                    <td><a href="#" className="btn btn-yellow btn-blue-hover btn-medium">Beli</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    currencies: state.Currency.currencies,
    isUpdating: state.Currency.isUpdating,
    isUpdated: state.Currency.isUpdated,
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    RequestCurrencyUpdate : () => dispatch(RequestCurrencyUpdate())
  };
}

const CurrencyPage = connect(mapStateToProps,matchDispatchToProps)(Currencies);

export default CurrencyPage;
