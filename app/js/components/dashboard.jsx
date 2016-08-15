import React from 'react';
import BaseComponent from './base.jsx';
import Refire from '../firebaseModule/Refire.js';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';
import { Link } from 'react-router';
import MemberList from './memberList';
import UserDashboard from './userDashboard';

export default class Dashboard extends BaseComponent {

  constructor(props){
    super(props);
    this.state = {
      activeView: ''
    };
    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props});
    this.bind('hashChange');
  }

  hashChange(routeObject){
    if(!!routeObject && routeObject.hash){
      switch(routeObject.hash){
        case('#members'):
          this.setState({activeView: 'members'});
          break;
        case('#account'):
          this.setState({activeView: 'account'});
          break;
        case('#manage-users'):
          this.setState({activeView: 'manage-users'});
          break;
        default:
          this.setState({activeView: 'default'});
          break;
      }
    }
  }

  componentDidMount(){
    this.context.router.listen(this.hashChange);
  }

  render(){

    let view;

    switch(this.state.activeView){
      case('members'):
        view = <MemberList/>;
        break;
      case('account'):
        view = <UserDashboard/>
        break;
      case('manage-users'):
        view = <div>Manage Users View</div>;
        break;
      case('default'):
        view = <div>Default dashboard view</div>;
      default:
        view = <div>Default dashboard view</div>;
        break;
    }

    return(
      <section className='dashboard'>
        <ul>
          <li><Link to={'#members'}>Members</Link></li>
          <li><Link to={'#account'}>Your Account</Link></li>
          <li><Link to={'#manage-users'}>Manage Users</Link></li>
        </ul>
        { view }
      </section>
    )
  }
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}
Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
}
