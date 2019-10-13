import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import elem_test from './elem_test.mp4';
import './User.css';

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
      <div className="login_page">

        <video autoPlay loop muted className="login_video">
             <source src={elem_test} type="video/mp4" />
        </video>

        <div className="login_form">

          <div className="login_form_fillup">
            <h3 className="login_form_desc"> Log in to use our SESTO Element!
            </h3>

            <div className="login_form_username">
              <TextField id="outlined-user_name"
                         className="user_name"
                         label="Username"
                         type="username"
                         value={this.state.value}
                         margin="normal"
                         variant="filled"
                         onChange={this.handleUsername}/>
           </div>

           <div className="login_form_password">
            <TextField id="outlined-password"
                       className="password"
                       label="Password"
                       type="password"
                       value={this.state.value}
                       margin="normal"
                       variant="filled"
                       onChange={this.handlePassword}/>
           </div>

           <div className="login_form_submit_button">
            <Button className="submit"
                    color="secondary"
                    variant="contained"
                    onClick={this.AuthenticateUser}>
                    Log in
            </Button>
         </div>
        </div>
      </div>
    </div>
    )
  }
}

export default User;
