import React from 'react';

export default class TodoListsForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      newListName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ newListName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.firebaseRef.push({
      name: this.state.newListName,
      timestamp: Date.now()
    });
    this.setState({ name: '' });
  }

  render(){
    return(
      <form onSubmit={ this.handleSubmit } >
        <input onChange={ this.onChange } value={ this.state.newListName } placeholder='Create a new todo list'/>
        <button>Add List</button>
      </form>
    )
  }
}

TodoListsForm.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
  firebaseListsRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
}
