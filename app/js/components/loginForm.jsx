import React from 'react';
import BaseComponent from './base.jsx';

export default class LoginForm extends BaseComponent {

  constructor(props){
    super(props);
    this.state = {
      authData: this.props.authData
    }
    this.bind('onEmailStateChange', 'onPasswordStateChange', 'unAuth', 'handleSubmit');
  }

  onEmailStateChange(e) {
    this.setState({email: e.target.value});
  }

  onPasswordStateChange(e) {
    this.setState({password: e.target.value});
  }

  unAuth(e) {
    e.preventDefault();
    this.props.firebaseRef.unauth();
    this.setState({ authData: this.props.firebaseRef.getAuth() });
    this.props.onUnAuth(this.props.firebaseRef.getAuth());
  }

  handleSubmit(e) {
    e.preventDefault();
    var _this = this;
    return this.props.firebaseRef.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        _this.setState({email: '', password: '', authData: authData});
        this.props.onAuth(authData);
      }
    });
  }

  componentDidUpdate(prevprops){
    let oldauth = prevprops.authData;
    let newauth = this.props.authData;
    if (newauth !== oldauth) this.setState({authData: this.props.authData});
  }

  render() {
    var authForm, authMessage;

    if(this.state.authData){
      authForm = <form id='logoutForm' onSubmit={this.unAuth}>
        <span><i className='fa fa-user'></i>: {this.state.authData.password.email}</span>
        <input type='submit' className='info' value='Logout' />
      </form>
    } else {
      authForm = <form id='loginForm' className='login-form' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='email' id='email' onChange={this.onEmailStateChange} value={this.state.email} required />
          <label htmlFor='email'>Email: </label>
        </div>
        <div className='form-group'>
          <input type='password' id='password' onChange={this.onPasswordStateChange} value={this.state.password} required />
          <label htmlFor='password'>Password:</label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    }
    return authForm;
  }
}

LoginForm.propTypes = {}

LoginForm.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/projects'),
}

// <a className='auth' href='#' onClick={this.unAuth}>Logout</a>
