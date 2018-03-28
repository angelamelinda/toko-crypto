import React , { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {RequestLogout} from '../../redux/action/userAction';
import LoginView from '../Login';
import RegisterView from '../Register';
import './style.css';

class Header extends Component {
  constructor(props){
    super(props);
    this.state= {
      extraClass: ''
    };
    this.openDropdown = this.openDropdown.bind(this);
  }
  componentDidUpdate(){
    document.querySelectorAll('.menu ul')[0].classList.remove('active-dropdown');
    { this.props.isFailed ? (
      document.querySelectorAll('.menu ul')[0].classList.add('active-dropdown')
    ) : null}

    { this.props.isLoggedIn ? (
      document.querySelectorAll('.menu ul')[0].classList.remove('active-dropdown')
    ) : null}
  }
  componentWillMount(){

    switch (this.props.location.pathname) {
      case '/':
        this.setState({extraClass: 'transparent'});
        break;
      default:
        this.setState({extraClass: ''});
        break;
    }
    this.props.history.listen(() => {
      switch (this.props.history.location.pathname) {
        case '/':
          this.setState({extraClass: 'transparent'});
          break;
        default:
          this.setState({extraClass: ''});
          break;
      }
    })
  }
  openDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.parentNode.parentNode.classList.toggle('active-dropdown');
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.RequestLogout();
  }
  render() {
    return (
      <header className={`${this.state.extraClass}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="brand"><NavLink to="/" exact><h2 className="mb-0">Toko Crypto</h2></NavLink></div>
          <div className="menu">
            <ul className="list-unstyled mb-0">
              <li className="d-inline-block"><NavLink activeClassName="active" to="/currencies" exact>Currencies</NavLink></li>
              { this.props.isLoggedIn ? (
                <li className="d-inline-block" >
                  <a href="javascript:void(0)" onClick={this.openDropdown}>Hi, {this.props.userInformation.username}</a>
                  <div className="dropdown loggedin-form-wrapper">
                    <ul className="list-unstyled mb-0">
                      <li className="d-block"><div className="balance">Balance IDR <span className="d-block">IDR {this.props.balanceInformation_idr.toLocaleString(undefined, { minimumFractionDigits: 0,maximumFractionDigits: 8})}</span><div className="clearfix"></div></div></li>
                      <li className="d-block"><NavLink activeClassName="active" to="/balance" exact>Balance</NavLink></li>
                      <li className="d-block"><a className="d-block cursor-pointer" onClick={this.handleLogout}>Logout</a></li>
                    </ul>
                  </div>
                </li>
              ):(
                <li className="d-inline-block" >
                  <a href="javascript:void(0)" onClick={this.openDropdown}>Masuk</a>
                  <div className="dropdown login-form-wrapper">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a id="login-tab" className="nav-link active" href="#login" data-toggle="tab" role="tab" aria-controls="login" aria-selected="true">Login</a>
                      </li>
                      <li className="nav-item">
                        <a id="register-tab" className="nav-link" href="#register" data-toggle="tab"  role="tab" aria-controls="register" aria-selected="true">Register</a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div id="login" className="tab-pane fade show active" role="tabpanel" aria-labelledby="login-tab">
                        <LoginView/>
                        { this.props.isFailed ? (<span className="error-message text-center d-block color-red mt-1"><small>Email atau password yang dimasukkan salah</small></span>) : null}
                      </div>
                      <div id="register" className="tab-pane fade" role="tabpanel" aria-labelledby="register-tab">
                        <RegisterView/>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    userInformation: state.User.userInformation,
    isLoggedIn: state.User.isLoggedIn,
    isLogging: state.User.isLogging,
    isFailed: state.User.isFailed,
    balanceInformation_idr: state.Balance.balanceInformation.balanceIDR,
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
    RequestLogout : credential => dispatch(RequestLogout(credential))
  };
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Header));
