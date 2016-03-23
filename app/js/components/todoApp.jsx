// main libraries
import React from 'react';
import { Router } from 'react-router';

// custom react components
import TodoLists from './todoLists.jsx';
import TodoListsForm from './todoListsForm.jsx'
import Navbar from './navbar.jsx';

// custom vanilla modules
import Refire from '../firebaseModule/Refire.js';
import Permissions from '../modules/Permissions.js';

// constants
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.permissions = new Permissions({props: this.props});
    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props});
    this.state = { authData: this.permissions.getAuth() };
    this.handleAuthEvent = this.handleAuthEvent.bind(this);
  }

  componentDidMount() {
    // the component is all set, and you can access the component's props and initial state
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {}

  handleAuthEvent(authData){
    if(authData){
      this.setState({ authData: authData });
    } else {
      this.setState({ authData: null });
      this.context.router.push('/')
    }
  }

  render() {
    return (
      <div id='todo-app'>
        <Navbar authData={ this.state.authData } onAuthEvent={this.handleAuthEvent} {...this.props} />
        <section className='list-and-form-container'>
          <TodoLists authData={this.state.authData} />
          <TodoListsForm authData={this.state.authData} />
        </section>
        <div className='todo-app-children'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

TodoApp.propTypes = {
  items: React.PropTypes.array
}

TodoApp.contextTypes = {
  router: React.PropTypes.func.isRequired
}
