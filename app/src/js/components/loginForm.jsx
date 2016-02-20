import React from 'react';

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      authData: this.props.authData
    }
    this.authState = this.authState.bind(this);
    this.onEmailStateChange = this.onEmailStateChange.bind(this);
    this.onPasswordStateChange = this.onPasswordStateChange.bind(this);
    this.unAuth = this.unAuth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authState();
  }

  authState() {
    var auth = this.props.firebaseRef.getAuth();
    return this.setState({ authData: auth });
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
    return this.authState();
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
      }
    });
  }

  render() {
    var authForm;
    if(this.state.authData){
      authForm = <a onClick={this.unAuth}>Logout</a>
    } else {
      authForm = <form onSubmit={this.handleSubmit}>
        <h3>Login</h3>
        <label htmlFor='email'>Email: <input type='email' id='email' onChange={this.onEmailStateChange} value={this.state.email}></input></label>
        <label htmlFor='password'>Password: <input type='password' id='password' onChange={this.onPasswordStateChange} value={this.state.password}></input></label>
        <button type='submit'>Submit</button>
      </form>
    }
    return authForm;
  }
}

LoginForm.propTypes = {}

LoginForm.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com'),
  authData: {}
}
