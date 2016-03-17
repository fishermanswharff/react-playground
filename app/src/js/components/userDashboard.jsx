import React from 'react';
import ReactDOM from 'react-dom';
import UserAttributeForm from './userAttributeForm';
import { render } from 'react-dom';

export default class UserDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.loadUser = this.loadUser.bind(this);
    this.userInfoCallback = this.userInfoCallback.bind(this);
  }

  loadUser(){
    let userRef = new Firebase(`https://jwtodoapp.firebaseio.com/users/${this.props.params.userId}`);
    userRef.on('value', this.userInfoCallback);
  }

  userInfoCallback(datasnapshot){
    this.setState({user: datasnapshot.val()});
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
      <section id='userDashboard'>
        <header></header>
        <ul className='user-attributes'>
          { attributes }
        </ul>
      </section>
    )
  }
}

