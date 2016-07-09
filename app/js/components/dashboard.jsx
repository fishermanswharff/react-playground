import React from 'react';
import BaseComponent from './base.jsx';
import Refire from '../firebaseModule/Refire.js';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class Dashboard extends BaseComponent {

  constructor(){
    super();
    this.state = {
      members: {},
      notes: {},
      projects: {},
      tasks: {},
      users: {}
    };
    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props})
    this.bind('fetchData','handleDataSnapshot', 'createProject');
  }

  fetchData(){
    this.refire.fetch({
      key: '',
      context: this,
      array: false,
      success: this.handleDataSnapshot
    });
  }

  handleDataSnapshot(snapshot){
    this.setState(snapshot);
  }

  createProject(project){
    return <div></div>
  }

  componentDidMount(){
    this.fetchData();
  }

  render(){
    // console.log(this.state);
    return(
      <div></div>
    )
  }
}
