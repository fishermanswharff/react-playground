import React from 'react';
import ReactDOM from 'react-dom';
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
      attributes.push(<li>{attr}: {this.state.user[attr]}</li>)
    }

    return(
      <section id='userDashboard'>
        <header></header>
        <ul>
          {attributes}
        </ul>
      </section>
    )
  }
}

