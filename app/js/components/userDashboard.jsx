import React from 'react';
import BaseComponent from './base.jsx';
import ReactDOM from 'react-dom';
import UserAttributeForm from './userAttributeForm.jsx';
import { render } from 'react-dom';

export default class UserDashboard extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      authData: null,
      uifeedback: null,
      emailConfirmation: null,
      oldPassword: null,
      newPassword: null
    };

    this.bind('loadUser','userInfoCallback','changePassword','onChangeHandler');
  }

  loadUser(){
    let userRef = new Firebase(`https://jwtodoapp.firebaseio.com/users/${this.props.params.userId}`);
    userRef.on('value', this.userInfoCallback);
  }

  userInfoCallback(datasnapshot){
    this.setState({user: datasnapshot.val()});
  }

  changePassword(event){
    event.preventDefault();
    let ref = new Firebase('https://jwtodoapp.firebaseio.com');
    ref.changePassword({
      email: this.state.emailConfirmation,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    }, (err) => {
      if (err) {
        switch(err.code) {
          case 'INVALID_PASSWORD':
            this.setState({ uifeedback: 'The specified user account password is incorrect.' });
            break;
          case 'INVALID_USER':
            this.setState({ uifeedback: 'The specified user account does not exist.' });
            break;
          default:
            this.setState({ uifeedback: err.toString() });
        }
      } else {
        this.setState({
          emailConfirmation: '',
          oldPassword: '',
          newPassword: '',
          uifeedback: 'User password changed successfully!'
        });
      }
    });
  }

  onChangeHandler(event){
    event.preventDefault();
    this.setState({[`${event.target.id}`]: event.target.value});
  }

  componentDidMount(){
    this.loadUser();
  }

  render(){

    var attributes = [];

    for(var attr in this.state.user){
      attributes.push(<UserAttributeForm key={attr} attribute={attr} value={this.state.user[attr]} uid={this.props.params.userId} />)
    }

    return(
      <section id='userDashboard' >
        <div>{this.state.uifeedback}</div>
        <ul className='user-attributes'>{ attributes }</ul>
        <div className='form-container'>
          <form onSubmit={this.changePassword}>
            <h3>Change your password</h3>
            <div className='form-group'>
              <input type='email' id='emailConfirmation' value={this.state.emailConfirmation} onChange={this.onChangeHandler} required/>
              <label htmlFor='email'>Email</label>
            </div>
            <div className='form-group'>
              <input type='password' id='oldPassword' value={this.state.oldPassword} onChange={this.onChangeHandler} required/>
              <label htmlFor='oldPassword'>Old Password</label>
            </div>
            <div className='form-group'>
              <input type='password' id='newPassword' value={this.state.newPassword} onChange={this.onChangeHandler} required/>
              <label htmlFor='newPassword'>New Password</label>
            </div>
            <div className='form-group'>
              <input type='submit' value='Change Password'/>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

