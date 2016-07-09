import React from 'react';
import BaseComponent from './base.jsx';

export default class TodoListItemForm extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      newItemText: null
    };
    this.bind('newItemSubmit', 'newItemChange');
  }

  newItemSubmit(e) {
    e.preventDefault();
    var promise = this.props.firebase.todosRef.push({
      done: false,
      project: this.props.params.listId,
      text: this.state.newItemText,
      timestamp: Date.now()
    }, (error) => {
      if(error){
        console.log('sync failed :(');
      } else {
        this.setState({newItemText: null});
      }
    });

    promise.then(function(val){
      // console.log(val.key(), val);
    });
  }

  newItemChange(e) {
    this.setState({ newItemText: e.target.value });
  }

  render(){
    return(
      <div className='form-container'>
        <form id='new-list-item' onSubmit={ this.newItemSubmit }>
          <div className='form-group'>
            <input id='new-list-item' type='text' onChange={ this.newItemChange } value={ this.state.newItemText } required/>
            <label htmlFor='new-list-item'>{this.props.listName} new todo:</label>
          </div>
          <div className='form-group'>
            <button type='submit'>Add Item</button>
          </div>
        </form>
      </div>
    )
  }
}
