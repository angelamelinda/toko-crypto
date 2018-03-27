import React , { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {RequestLogout} from '../../redux/action/userAction';

import LoginView from '../Login';
import Register from '../Register';

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
    // .classList.remove('active-dropdown');
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
    e.target.parentNode.parentNode.classList.toggle('active-dropdown')
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
              <li className="d-inline-block" >
                <a href="javascript:void(0)" onClick={this.openDropdown}>Masuk</a>
                  { this.props.isLoggedIn ? (
                    <div className="dropdown login-form-wrapper">
                      <div>
                      HEY!
                      {this.props.userInformation.username}
                      </div>
                      <a onClick={this.handleLogout}>Logout</a>
                    </div>
                  ):(
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
                        </div>
                        <div id="register" className="tab-pane fade" role="tabpanel" aria-labelledby="register-tab">
                          <Register/>
                        </div>
                      </div>
                    </div>
                  )}

              </li>
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
    isLogging: state.User.isLogging
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
    RequestLogout : credential => dispatch(RequestLogout(credential))
  };
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Header));
