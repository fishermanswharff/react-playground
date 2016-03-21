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
    this.setState({ newListName: null });
  }

  render(){

    var view;

    if(this.props.authData){
      view = <div className='form-container'>
        <form id='new-todo-list-form' onSubmit={ this.handleSubmit } >
          <div className='form-group'>
            <input id='new-todo-list' type='text' onChange={ this.onChange } value={ this.state.newListName } required />
            <label htmlFor='new-todo-list'>new list:</label>
          </div>
          <div className='form-group'>
            <button type='submit'>Add List</button>
          </div>
        </form>
      </div>
    } else {
      view = <div></div>
    }

    return view;
  }
}

TodoListsForm.defaultProps = {
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
  firebaseListsRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
}
