import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      password: '',
      baseURL: '',
      access_token: ''
    }

    this.AuthenticateUser = this.AuthenticateUser.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  AuthenticateUser() {
    const self = this;

    try {
      const user_name = this.state.user_name;
      const password = this.state.password;
      const baseURL = this.state.baseURL + '/auth';

      const response = axios({method: 'POST',
                              baseURL: baseURL,
                              data: {user_name: user_name,
                                     password: password},
                              headers: {'Content-type': 'application/json'}}).then(function(value) {
                                self.setState({access_token: value.data.access_token})
                                self.props.onChange(value.data.access_token);
                              })

    }
    catch (error) {
      if (error.response) {
        console.log("error data: " + error.response.data);
        console.log("error status: " + error.response.status);
        console.log("error headers: " + error.response.headers);
      }
      else if (error.request) {
        console.log("error request: " + error.request);
      }
      else {
        console.log("error message: " + error.message);
      }

      console.log("error: " + error)
    }
  }

  handleUsername(event) {
    this.setState({user_name: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }


  render () {

    this.state.baseURL = this.props.baseURL;

    return (

      <div className="login_form">
        <TextField className="user_name"
                   label="Username"
                   type="username"
                   value={this.state.value}
                   onChange={this.handleUsername}/>

        <TextField className="password"
                   label="Password"
                   type="password"
                   value={this.state.value}
                   onChange={this.handlePassword}/>

        <Button className="submit"
                onClick={this.AuthenticateUser}>
                Login
        </Button>
      </div>
    )
  }
}

export default User;
