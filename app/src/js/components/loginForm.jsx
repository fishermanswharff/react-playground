var LoginForm = React.createClass({
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com'),
  getInitialState() {
    return { email: '', password: '' };
  },
  componentDidMount() {
    this.authState();
  },
  onEmailStateChange(e) {
    this.setState({email: e.target.value});
  },
  onPasswordStateChange(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    var _this = this;
    return this.firebaseRef.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        _this.setState({email: '', password: '', auth: _this.authState()});
      }
    });
  },
  authState() {
    this.setState({authData: this.firebaseRef.getAuth()});
  },
  unAuth(e) {
    e.preventDefault();
    this.firebaseRef.unauth();
    return this.authState();
  },
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
});
