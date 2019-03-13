import React, { Component } from 'react';
import './LoginPage.css'

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state={
      loginMessage: '',
    }
  }
    render() {
      return (
        <div className='login-container'>
          <header className='login-header'>
              <h1 className= 'login-header-title'>Welcome to</h1>
              <h1 className= 'login-header-title_chatup'>Chat-Up</h1>
          </header>
          <div className='login-form'>
            <div className='login-form-username'>
              <label className='login-form-username-label'>{this.props.loginMessage}</label>
              <input type='text' maxLength= '12' className='login-form-username-input' placeholder='Username' onChange={this.props.onChange}></input>
            </div>
          </div>
          <button className='login-button' onClick={this.props.onLogin} >Login</button>
        </div>

   //           <button className='login-button' onClick={this.props.onLogin {this.onclick()}}>Login</button>     
      );
    }
  }


export default LoginPage;