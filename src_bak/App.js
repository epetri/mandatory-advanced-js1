import React, { Component } from 'react';
import io from 'socket.io-client';
import Login from './LoginPage';
import Chat from './chat';

const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      loginMessage: 'Enter username',
    };

    this.onLogin = this.onLogin.bind(this);
    this.logOut = this.logOut.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  
  onChange(e){
    this.setState({username: e.target.value});
  }  
 
  onLogin(){
    let regex = /^[a-zA-Z0-9(_|-| )]+$/;
    if(regex.test(this.state.username)){
      this.setState({ isLoggedIn: true});    
    } else {
      this.setState({loginMessage: 'Not a valid username'})
    }
  }

  logOut(){
    this.setState({ isLoggedIn: false , loginMessage: 'Enter username'});
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? <Chat logOut={this.logOut} username={this.state.username} /> : <Login onLogin={this.onLogin} loginMessage={this.state.loginMessage} username={this.state.username} onChange={this.onChange}/>}
      </div>
    );
  }
}

export default App;
