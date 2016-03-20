import React from 'react';
import TodoLists from './todoLists';
import TodoListsForm from './todoListsForm'
import LoginForm from './loginForm';
import Navbar from './navbar';
import { Router } from 'react-router';
import FirebaseRequest from '../modules/FirebaseRequest';
import Permissions from '../modules/Permissions';

export default class TodoApp extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.permissions = new Permissions({props: this.props});
    this.requests = new FirebaseRequest({props: this.props});
    this.state = {
      items: [],
      authData: this.permissions.getAuth(),
    };

    this.loadListsFromServer = this.loadListsFromServer.bind(this);
    this.handleAuthEvent = this.handleAuthEvent.bind(this);
    this.listsPromiseHandler = this.listsPromiseHandler.bind(this);
  }

  loadListsFromServer() {
    this.setState({items: []});
    this.requests.getAllLists().then(this.listsPromiseHandler);
  }

  listsPromiseHandler(object){
    var lists = []
    for(var key in object)
      lists.push({key: key, list: object[key]});
    this.setState({items: lists});
  }

  componentDidMount() {
    // the component is all set, and you can access the component's props and initial state
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
