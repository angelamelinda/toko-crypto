import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RequestLogin} from '../../redux/action/userAction';
import './style.css';

class Login extends Component {
  constructor(props) {
      super(props)

      this.state = {
        email: '',
        password: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {

  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name] : value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let credential = {
      email:this.state.email,
      password:this.state.password
    }
    this.props.RequestLogin(credential);
  }
  render(){
    return(
      <form id="login-form" onSubmit={this.handleSubmit}>
        <input className="mb-3" type="email" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email}/>
        <input className="mb-3" type="password" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password}/>
        <button className="btn-yellow btn-blue-hover btn-medium w-100">Masuk</button>
      </form>
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
    RequestLogin : credential => dispatch(RequestLogin(credential))
  };
}

const LoginView = connect(mapStateToProps,matchDispatchToProps)(Login)

export default LoginView;
