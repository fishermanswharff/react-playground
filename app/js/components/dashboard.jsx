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
    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props});
    this.bind('fetchData','handleDataSnapshot', 'createProject','buildMemberLists');
  }

  fetchData(){
    this.refire.fetch({
      key: '',
      context: this,
      array: false,
      success: this.handleDataSnapshot
    });
  }

  buildMemberLists(projectKey,index,array){
    let projectObject = this.state.projects[projectKey],
        membersObject = this.state.members[projectKey],
        projectMembers = [],
        nonMembers = [];

    for(let member in membersObject){
      projectMembers.push(this.state.users[member])
    };

    for(let user in this.state.users){
      if(!(membersObject[user])){
        nonMembers.push(this.state.users[user]);
      }
    };

    return(
      <li key={projectKey}>
        { projectObject.name }
        <ul>Members:
          {
            projectMembers.map((member,index) => {
              return <li key={`${index + 1}-${projectKey}-member`}>{member.email}</li>;
            })
          }
        </ul>
        <ul>Non-members
          {
            nonMembers.map((user, index) => {
              return <li key={`${index+1}-${projectKey}-nonMember`}>{user.email}</li>
            })
          }
        </ul>
      </li>
    )
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
    return(
      <div>
        <ul>{ Object.keys(this.state.projects).map(this.buildMemberLists) }</ul>
      </div>
    )
  }
}
