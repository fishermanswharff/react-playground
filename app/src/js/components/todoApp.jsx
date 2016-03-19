import React from 'react';
import TodoLists from './todoLists';
import TodoListsForm from './todoListsForm'
import LoginForm from './loginForm';
import Navbar from './navbar';
import { Router } from 'react-router';
import Permissions from '../modules/permissions';

export default class TodoApp extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.permissions = new Permissions({props: this.props, state: this.state});
    this.state = {
      items: [],
      authData: this.permissions.getAuth(),
    };

    this.loadListsFromServer = this.loadListsFromServer.bind(this);
    this.handleAuthEvent = this.handleAuthEvent.bind(this);
  }

  loadListsFromServer() {
    this.setState({items: []});
    this.items = [];
    this.props.firebaseListsRef.on('child_added', (dataSnapshot) => {
      this.items.push({key: dataSnapshot.key(), list: dataSnapshot.val()});
      this.setState({ items: this.items });
    });
  }

  componentDidMount() {
    // the component is all set
    this.loadListsFromServer();
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount () {}

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
          <TodoLists items={ this.state.items } authData={this.state.authData} />
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

TodoApp.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/'),
  firebaseListsRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
}
