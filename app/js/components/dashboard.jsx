import React from 'react';
import BaseComponent from './base.jsx';
import Refire from '../firebaseModule/Refire.js';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class Dashboard extends BaseComponent {

  constructor(props){
    super(props);
    this.state = {
      members: {},
      notes: {},
      projects: {},
      tasks: {},
      users: {}
    };
    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props});
    this.bind('fetchData','handleDataSnapshot','buildMemberLists','removeProject','addMember','removeMember');
  }

  fetchData(){
    this.refire.fetch({
      key: '',
      context: this,
      array: false,
      success: this.handleDataSnapshot
    });
  }

  addMember(event){
    let projectKey = event.currentTarget.className.replace(/\-nonmember$/gim, ''),
        uuid = event.currentTarget.dataset.uuid;

    this.refire.update({
      key: `members/${projectKey}`,
      data: { [uuid]: true },
      success: (error => {
        if(error){
          console.error(error);
        } else {
          this.fetchData();
        }
      })
    });
  }

  removeMember(event){
    let projectKey = event.currentTarget.className.replace(/\-member/gim, ''),
        uuid = event.currentTarget.dataset.uuid;

    this.refire.remove({
      key: `members/${projectKey}/${uuid}`,
      success: (error) => {
        if(error) {
          console.log(error);
        } else {
          this.fetchData();
        }
      }
    })
  }

  removeProject(event){
    let projectKey = event.currentTarget.id.replace(/\-remove$/gim, '');

    if(this.state.tasks[projectKey] === undefined){
      ['notes','projects','members'].forEach(key => {
        this.refire.remove({
          key: `${key}/${projectKey}`,
          success: (err => {
            if(err){ console.error(err) }
            else {
              this.fetchData();
              console.log(`deleted ${key} for project: ${projectKey}`);
            }
          })
        });
      });
    } else {
      console.error('can’t delete a list that has tasks');
    }
  }

  buildMemberLists(projectKey,index,array){
    let projectObject = this.state.projects[projectKey],
        membersObject = this.state.members[projectKey],
        projectMembers = [],
        nonMembers = [];

    for(let member in membersObject){
      projectMembers.push({uuid: member, user: this.state.users[member]})
    };

    for(let user in this.state.users){
      if(!(membersObject[user])){
        nonMembers.push({uuid: user, user: this.state.users[user]});
      }
    };

    return(
      <li key={projectKey}>
        <div className='project-title'>
          <span className='project-name'>{ projectObject.name }</span>
          <span className='remove-project'>
            <a href='javascript:void(0)' id={`${projectKey}-remove`} onClick={this.removeProject}>
              <i className='fa fa-minus-square-o'></i>
            </a>
          </span>
        </div>
        <ul><span className='list-title'>Members:</span>
          {
            projectMembers.map((memberObject,index) => {
              return <li key={`${index + 1}-${projectKey}-member`}>
                <span className='member-email'>{memberObject.user.email}</span>
                <span className='remove-member'>
                  <a href='javascript:void(0)' className={`${projectKey}-member`} data-uuid={memberObject.uuid} onClick={this.removeMember}>
                    <i className='fa fa-minus-square-o'></i>
                  </a>
                </span>
              </li>;
            })
          }
        </ul>
        <ul><span className='list-title'>Non-members</span>
          {
            nonMembers.map((userObject, index) => {
              return <li key={`${index+1}-${projectKey}-nonMember`}>
                <span className='non-member-email'>{ userObject.user.email }</span>
                <span className='add-member'>
                  <a href='javascript:void(0)' className={`${projectKey}-nonmember`} data-uuid={userObject.uuid} onClick={this.addMember}>
                    <i className='fa fa-plus-square-o'></i>
                  </a>
                </span>
              </li>
            })
          }
        </ul>
      </li>
    )
  }

  handleDataSnapshot(snapshot){
    this.setState(snapshot);
  }

  componentDidMount(){
    this.fetchData();
  }

  componentWillUnmount() {
    
  }

  render(){

    return(
      <section className='dashboard'>
        <ul className='project-lists'>{ Object.keys(this.state.projects).map(this.buildMemberLists) }</ul>
      </section>
    )
  }
}
