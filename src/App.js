import React from 'react';
import User from './User.js';
import CallApp from './CallApp.js';
import baseURL from './baseURL.json'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      baseURL: baseURL["baseURL"],
      access_token: ''
    }

    this.setToken = this.setToken.bind(this);
  }

  setToken(access_token) {
    this.setState({access_token: access_token});
  }

  render() {

    if (this.state.access_token === '') {
      return (
        <div className="App_LoginScreen">
          <User className="App_UserLogin"
                baseURL={this.state.baseURL}
                onChange={this.setToken}/>
        </div>
      )
    }
    else {
      return (
        <div className="App_AuthorizationPass">
          <CallApp className="App_CallApp"
                   access_token={this.state.access_token}
                   baseURL={this.state.baseURL}/>

        </div>
      )
    }
  }
}

export default App;
