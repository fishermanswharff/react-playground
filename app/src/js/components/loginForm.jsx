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

  componentDidMount(){}

  componentDidUpdate(prevprops){
    let oldauth = prevprops.authData;
    let newauth = this.props.authData;
    if (newauth !== oldauth) this.setState({authData: this.props.authData});
    // this.setState({authData: this.props.authData});
  }

  render() {
    var authForm;
    if(this.state.authData){
      authForm = <a href='#' onClick={this.unAuth}>Logout</a>
    } else {
      authForm = <form onSubmit={this.handleSubmit}>
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
}
