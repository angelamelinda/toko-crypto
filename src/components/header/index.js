import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
      <header className="">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="brand"><NavLink to="/" exact><h2 className="mb-0">Toko Crypto</h2></NavLink></div>

          <div className="menu">
            <ul className="list-unstyled mb-0">
              <li className="d-inline-block"><NavLink activeClassName="active" to="/currencies" exact>Currencies</NavLink></li>
              <li className="d-inline-block"><NavLink to="/login">Log In</NavLink></li>
            </ul>

          </div>
        </div>
      </header>
    )
  }
}

export default Header;
