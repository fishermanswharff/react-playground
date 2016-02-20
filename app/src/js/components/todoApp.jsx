import React from 'react';
import TodoList from './TodoList'
import LoginForm from './LoginForm'

class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { items: [] }
    this.loadListsFromServer = this.loadListsFromServer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { items: [], name: '' };
    this.loadListsFromServer();
  }

  loadListsFromServer() {
    this.items = [];
    this.props.firebaseRef.on('child_added', (dataSnapshot) => {
      this.items.push(dataSnapshot.val());
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

  render() {
    return (
      <div>
        <LoginForm />
        <TodoList items={ this.state.items } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.name } />
          <button>Add List</button>
        </form>
      </div>
    );
  }
}

TodoApp.propTypes = {
  items: React.PropTypes.array
}

TodoApp.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
}

export default TodoApp;
