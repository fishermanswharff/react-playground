import React from 'react';
import TodoLists from './todoLists';
import TodoListsForm from './todoListsForm'
import LoginForm from './loginForm';
import Navbar from './navbar';

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.loadListsFromServer = this.loadListsFromServer.bind(this);
    this.authState = this.authState.bind(this);
    this.state = {
      items: [],
      authData: null,
    };
  }

  loadListsFromServer() {
    this.setState({items: []});
    this.items = [];
    this.props.firebaseListsRef.on('child_added', (dataSnapshot) => {
      this.items.push({key: dataSnapshot.key(), list: dataSnapshot.val()});
      this.setState({ items: this.items });
    });
  }

  authState() {
    var auth = this.props.firebaseRef.getAuth();
    this.setState({authData: auth});
  }

  componentDidMount() {
    // the component is all set
    this.loadListsFromServer();
    this.authState();
  }

  componentDidUpdate(prevProps) {
    // the properties changed
  }

  componentWillUnmount () {
    // remove state, props, etc.
  }

  render() {
    return (
      <div id='todo-app'>
        <Navbar authData={ this.state.authData } />
        <section className='list-and-form-container'>
          <TodoLists items={ this.state.items } />
          <TodoListsForm />
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

TodoApp.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/'),
  firebaseListsRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
}
