import React, { Component } from 'react';
import './style.css';

class Login extends Component {
  render(){
    return(
      <div id="login">
        <div className="content">
          <div className="container d-flex align-items-center justify-content-center">
            <div className="login-form-wrapper">
              <h2 className="text-center mb-3 text-white">Login</h2>
              <form id="login-form">
                <input id="email" className="mb-3" type="email" placeholder="Email" name="email"/>
                <input id="password" className="mb-3" type="password" placeholder="Password" name="password"/>
                <button className="btn-yellow btn-blue-hover btn-medium w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
