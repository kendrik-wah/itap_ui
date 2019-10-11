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
        <User className="UserLogin"
              baseURL={this.state.baseURL}
              onChange={this.setToken}/>
      )
    }
    else {
      return (
        <div className="AuthorizationPass">
          <CallApp className="CallApp"
                   access_token={this.state.access_token}
                   baseURL={this.state.baseURL}/>

        </div>
      )
    }
  }
}

/*
function App() {

  const user = AuthenticateUser()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button variant="contained" color="primary">
      Hello World
        </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
