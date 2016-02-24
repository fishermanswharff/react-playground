import React from 'react';
import TodoLists from './todoLists'
import LoginForm from './loginForm'

class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { items: [], authData: this.props.authData }
    this.loadListsFromServer = this.loadListsFromServer.bind(this);
    this.authState = this.authState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { items: [], name: '' };
  }

  loadListsFromServer() {
    this.items = [];
    this.props.firebaseListsRef.on('child_added', (dataSnapshot) => {
      this.items.push({key: dataSnapshot.key(), list: dataSnapshot.val()});
      this.setState({ items: this.items });
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.firebaseRef.push({
      name: this.state.name,
      timestamp: Date.now()
    });
    this.setState({ name: '' });
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  authState() {
    var auth = this.props.firebaseRef.getAuth();
    this.setState({authData: auth})
  }

  componentDidMount() {
    this.loadListsFromServer();
  }

  componentWillUnmount () {
    // remove state, props, etc.
  }

  render() {
    return (
      <div>
        <LoginForm authData={ this.state.authData }/>
        <TodoLists items={ this.state.items } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.name } />
          <button>Add List</button>
        </form>
        {this.props.children}
      </div>
    );
  }
}

TodoApp.propTypes = {
  items: React.PropTypes.array
}

TodoApp.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
  firebaseListsRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
}

export default TodoApp;
