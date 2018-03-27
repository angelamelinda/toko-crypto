import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RequestRegister} from '../../redux/action/userAction';
import './style.css';

class Register extends Component {
  constructor(props) {
      super(props)

      this.state = {
        email: '',
        username: '',
        password: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    console.log(e);
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
      username:this.state.username,
      password:this.state.password
    }
    this.props.RequestRegister(credential);
  }
  render(){
    return(
      <form id="register-form" onSubmit={this.handleSubmit}>
        <input className="mb-3" type="username" placeholder="Username" name="username" onChange={this.handleChange} value={this.state.username}/>
        <input className="mb-3" type="email" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email}/>
        <input className="mb-3" type="password" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password}/>
        <button className="btn-yellow btn-blue-hover btn-medium w-100">Daftar</button>
      </form>
    )
  }
}

const mapStateToProps = (state)=> {
  return {
    userinfo: state.User.userInformation,
    isLoggedIn: state.User.isLoggedIn,
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    RequestRegister : credential => dispatch(RequestRegister(credential))
  };
}

const RegisterView = connect(mapStateToProps,matchDispatchToProps)(Register);

export default RegisterView;
