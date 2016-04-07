import React from 'react';
import BaseComponent from './base.jsx';
import Refire from '../firebaseModule/Refire.js';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class TodoListsForm extends BaseComponent {

  constructor(props){
    super(props);
    this.state = {
      newListName: '',
    };

    this.bind('handleSubmit', 'onChange', 'onSubmitSuccess', 'createNewMember');
    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props});
  }

  onChange(e) {
    this.setState({ newListName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.refire.push({
      key: 'projects',
      data: {
        name: this.state.newListName,
        timestamp: Date.now()
      },
      success: this.onSubmitSuccess
    });
  }

  onSubmitSuccess(value){
    this.setState({ newListName: null });
    this.createNewMember(value);
  }

  createNewMember(value){
    this.refire.post({
      key: `members/${value.key()}`,
      data: { [this.props.authData.uid]: true },
      success: this.onNewMemberSuccess
    });
  }

  onNewMemberSuccess(value){
    console.log(value.key(), value);
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
