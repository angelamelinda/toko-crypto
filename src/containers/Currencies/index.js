import React , { Component } from 'react';
import { connect } from 'react-redux';
import Spotlight from '../../components/Spotlight'
import { RequestCurrencyUpdate } from '../../redux/action/currencyAction';
import { RequestBuyCoin, RequestSellCoin, RequestResetDeducted } from '../../redux/action/balanceAction';
import './style.css';

class Currencies extends Component {
  constructor(props) {
      super(props)

      this.state = {
        currencies: [],
        sortBy: {
          column: 'rank',
          sortType: 'asc',
        },
        userBalance : {
          coinAmount: '',
          priceIDR: '',
          coinName: '',
        },
        purchaseWarning: [],
        sellWarning: []
      }

      this.handle_sort = this.handle_sort.bind(this);
      this.sortCurrency = this.sortCurrency.bind(this);
      this.handleCoinTransaction = this.handleCoinTransaction.bind(this);
      this.handleBuySubmit = this.handleBuySubmit.bind(this);
      this.handleSellSubmit = this.handleSellSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
  handleCoinTransaction(e){
    e.preventDefault();
    this.props.RequestResetDeducted();
    var idCoin = e.target.parentNode.parentNode.id;
    {
      this.props.currencies.map((item, index) => {
      if (idCoin == item.id) {
        let coinOwned = this.props.balanceInformation.balanceCoin[item.name] == undefined ? 0.0 : this.props.balanceInformation.balanceCoin[item.name];
        this.setState({
          userBalance: {
            coinOwned: coinOwned,
            priceIDR:item.price_idr,
            coinName:item.name,
            coinAmountBuy:0.001,
            coinAmountSell:0.0
          }
        })
      }
    })
    }
  }
  handleChange(e){
    const target = e.target;
    var value = target.value;
    const name = target.name;

    let statebalance = this.state.userBalance;

    switch (name) {
      case 'coinAmountBuy':
        var warnings = [];
        if (isNaN(parseFloat(value))){
          warnings.push("Input tidak boleh selain angka");
        } else if( value  < 0.001 ){
          warnings.push("Pembelian minimal adalah 0.001");
        }
        this.setState({
          purchaseWarning :warnings
        });

        break;
      case 'coinAmountSell':
        var warnings = [];
        const available = this.state.userBalance.coinOwned;
        if (isNaN(parseFloat(value))) {
          warnings.push("Input tidak boleh selain angka");
        } else if(value > available) {
          warnings.push("Penjualan harus kurang dari koin tersedia.");
        } else if(value  <= 0) {
          warnings.push("Jumlah item dijual tidak boleh 0 atau kurang dari 0.");
        }
        this.setState({
          sellWarning :warnings
        });
        break;
      default:
    }

    this.setState({
      userBalance:{
        ...statebalance,
        [name] : value
      }
    })
  }
  handleBuySubmit(e){
    e.preventDefault();
    this.props.RequestBuyCoin(
      parseFloat(this.state.userBalance.priceIDR),
      parseFloat(this.state.userBalance.coinAmountBuy),
      this.state.userBalance.coinName,
      this.props.balanceInformation
    );
  }
  handleSellSubmit(e){
    e.preventDefault();
    this.props.RequestSellCoin(
      parseFloat(this.state.userBalance.priceIDR),
      parseFloat(this.state.userBalance.coinAmountSell),
      this.state.userBalance.coinName,
      this.props.balanceInformation
    );
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
    setInterval(this.props.RequestCurrencyUpdate,1000*60*5);
  }

  render() {
    return(
      <div id="currencies">
        <div className="content">
          <div className="container">
            <Spotlight/>
            <h2 className="text-center font-weight-normal mb-4 mt-4">Currencies</h2>
            <table id="list-currencies">
              <thead className="border-bottom">
                <tr className="text-center">
                  <th className={this.state.sortBy.column == "rank" ? "active" : "" }>
                    <span>Rank</span>
                    <button data-sort="rank" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "name" ? "active" : "" }>
                    <span>Currency</span>
                    <button data-sort="name" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "price_idr" ? "active" : "" }>
                    <span>Harga</span>
                    <button data-sort="price_idr" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "percent_change_24h" ? "active" : "" }>
                    <span>Change(24h)</span>
                    <button data-sort="percent_change_24h" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer ${this.state.sortBy.sortType}`}></button>
                  </th>
                  <th className={this.state.sortBy.column == "24h_volume_idr" ? "active" : "" }>
                    <span>Volume(24h)</span>
                    <button data-sort="24h_volume_idr" onClick={this.handle_sort} className={`dropdown-toggle btn-transparent cursor-pointer ${this.state.sortBy.sortType}`}></button>
                  </th>
                </tr>
              </thead>
              <tbody>
                { this.props.currencies.map((item, index) => (
                  <tr key={index} id={item.id}>
                    <td>{item.rank}</td>
                    <td>{item.name} ({item.symbol})</td>
                    <td>IDR {Number.parseFloat(item.price_idr).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</td>
                    <td><span className={item.percent_change_24h >=0 ? "color-green" : "color-red"}>{item.percent_change_24h}%</span></td>
                    <td>{Number.parseFloat(item["24h_volume_idr"]).toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</td>
                    {this.props.isLoggedIn ?
                      (
                        <td className="action"><a href="javascript:void(0)" data-toggle="modal" data-target="#form-coin-transaction" className="btn btn-yellow btn-blue-hover btn-medium" onClick={this.handleCoinTransaction}>Beli/Jual</a></td>
                      ):
                      null
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {
          this.props.isLoggedIn ?
          (
            <div className="modal fade" id="form-coin-transaction" tabIndex="-1" role="dialog">
              <div className="modal-dialog  modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="font-weight-normal mb-0">Transaksi Coin</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {this.props.isDeducted || this.props.isIncreased ?
                      (
                        <p className="text-center mb-0">Transaksi Berhasil</p>
                      ) : (
                        <div className="row">
                          <div className="col-12 col-lg-6 align-self-center">
                              <ul className="nav nav-tabs justify-content-center" role="tablist">
                                <li className="nav-item">
                                  <a id="buy-coin-tab" className="btn btn-yellow btn-blue-hover nav-link active" href="#buy-coin" data-toggle="tab" role="tab" aria-controls="buy-coin" aria-selected="true">Beli Coin</a>
                                </li>
                                <li className="nav-item">
                                  <a id="sell-coin-tab" className="btn btn-blue btn-yellow-hover nav-link" href="#sell-coin" data-toggle="tab"  role="tab" aria-controls="sell-coin" aria-selected="true">Jual Coin</a>
                                </li>
                              </ul>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="tab-content">
                              <div id="buy-coin" className="tab-pane fade show active" role="tabpanel" aria-labelledby="buy-coin-tab">
                                <h4 className="border-bottom pb-2 mb-3">Beli Coin</h4>
                                <form onSubmit={this.handleBuySubmit}>
                                  <section className="section-buy-coin">
                                    <input className="w-100 mb-3"type="text" disabled placeholder="Nama Coin" name="coinName" value={this.state.userBalance.coinName}/>
                                    <input className="w-100 mb-3"type="text" disabled placeholder="Harga Coin" name="priceIDR" value={this.state.userBalance.priceIDR}/>
                                    <input className="w-100 mb-3"type="text" placeholder="Jumlah Coin" name="coinAmountBuy" value={this.state.userBalance.coinAmountBuy} onChange={this.handleChange}/>
                                    <button type="submit" disabled={this.state.purchaseWarning.length != 0 ? true : false} className="cursor-pointer w-100 btn-blue btn-yellow-hover btn-medium">Beli</button>
                                    <small className="mt-2 text-right color-red d-block">{this.state.purchaseWarning}</small>
                                  </section>
                                </form>
                              </div>
                              <div id="sell-coin" className="tab-pane fade show" role="tabpanel" aria-labelledby="sell-coin-tab">
                                <h4 className="border-bottom pb-2 mb-3">Jual Coin</h4>
                                <form onSubmit={this.handleSellSubmit}>
                                  <section className="section-buy-coin">
                                    <input className="w-100 mb-3"type="text" disabled placeholder="Nama Coin" name="coinName" value={this.state.userBalance.coinName}/>
                                    <input className="w-100 mb-3"type="text" disabled placeholder="Harga Coin" name="priceIDR" value={this.state.userBalance.priceIDR}/>
                                    <input className="w-100 mb-3"type="text" disabled placeholder="Jumlah Koin Tersedia" name="coinOwned" value={this.state.userBalance.coinOwned}/>
                                    <input className="w-100 mb-3"type="text" placeholder="Jumlah Coin" name="coinAmountSell" value={this.state.userBalance.coinAmountSell} onChange={this.handleChange}/>
                                    <button type="submit" disabled={this.state.sellWarning.length != 0 ? true : false} className="cursor-pointer w-100 btn-yellow btn-blue-hover btn-medium">Jual</button>
                                    <small className="mt-2 text-right color-red d-block">{this.state.sellWarning}</small>
                                  </section>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
        ):
        null
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    currencies: state.Currency.currencies,
    isUpdating: state.Currency.isUpdating,
    isUpdated: state.Currency.isUpdated,

    isDeducting: state.Balance.isDeducting,
    isDeducted: state.Balance.isDeducted,
    isIncreased: state.Balance.isIncreased,
    balanceInformation: state.Balance.balanceInformation,

    isLoggedIn: state.User.isLoggedIn
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    RequestCurrencyUpdate : () => dispatch(RequestCurrencyUpdate()),
    RequestBuyCoin : ( priceIDR, coinAmount, coinName, balanceInformation ) => dispatch(RequestBuyCoin( priceIDR, coinAmount, coinName, balanceInformation )),
    RequestResetDeducted : () => dispatch(RequestResetDeducted()),
    RequestSellCoin: ( priceIDR, coinAmount, coinName, balanceInformation ) => dispatch(RequestSellCoin(priceIDR, coinAmount, coinName, balanceInformation ))
  };
}

const CurrencyPage = connect(mapStateToProps,matchDispatchToProps)(Currencies);

export default CurrencyPage;
