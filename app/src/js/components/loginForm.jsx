import React from 'react';

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      authData: this.props.authData
    }
    this.onEmailStateChange = this.onEmailStateChange.bind(this);
    this.onPasswordStateChange = this.onPasswordStateChange.bind(this);
    this.unAuth = this.unAuth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentDidUpdate(prevprops){
    let oldauth = prevprops.authData;
    let newauth = this.props.authData;
    if (newauth !== oldauth) this.setState({authData: this.props.authData});
  }

  render() {
    var authForm, authMessage;

    if(this.state.authData){
      authForm = (<a className='auth' href='#' onClick={this.unAuth}>Logout</a>)
    } else {
      authForm = <form className='auth inline' onSubmit={this.handleSubmit}>
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
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com'),
}
