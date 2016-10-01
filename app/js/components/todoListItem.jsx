import React from 'react';
import BaseComponent from './base.jsx';
import classnames from 'classnames';
import Refire from '../firebaseModule/Refire.js';
import ContentEditable from './contentEditable.jsx';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class TodoListItem extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      done: this.props.data.done,
      text: this.props.data.text,
      timestamp: this.props.data.timestamp,
      project: this.props.data.project,
      id: this.props.id,
      textClasses: `label ${this.props.data.done ? 'done-true' : ''}`
    };

    this.bind(
      'handleChecked',
      'convertTimestamp',
      'listenForChanges',
      'onItemDoneUpdate'
    );

    this.refire = new Refire({baseUrl: `${FIREBASE_REFS.tasksRef}/${this.props.data.project}/${this.props.id}/`, props: this.props});
  }

  handleChecked(event) {
    event.preventDefault();
    this.refire.update({
      key: '',
      data: { done: !this.state.done },
      success: this.onItemDoneUpdate
    });
    this.props.onDone();
  }

  onItemDoneUpdate(error){
    if(error){
      this.setState({ajaxFail: true});
    } else {
      this.setState({
        ajaxSuccess: true,
        textClasses: classnames('label', { 'done-true': this.state.done == true })
      });
    }
  }

  convertTimestamp(timestamp){
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if(minutes < 10){
      var string = '0' + minutes;
      minutes = string;
    }
    return hours + ':' + minutes + ' ' + month + '/' + day;
  }

  listenForChanges(){
    this.refire.bindToState({
      key: 'done',
      context: this,
      state: 'done',
      array: false
    });

    this.refire.bindToState({
      key: 'text',
      context: this,
      state: 'text',
      array: false
    });
  }

  componentDidMount(){
    this.listenForChanges();
  }

  render() {

    let textClasses = classnames('label', {
      'done-true': this.state.done == true,
    });

    let labelClasses = classnames({
      'checked': this.state.done == true,
      'text-updated': this.state.itemUpdated,
    });

    let ajaxClasses = classnames('ajax-status', {
      'success': this.state.ajaxSuccess,
      'fail': this.state.ajaxFail,
      'in-progress': this.state.inProgress
    });

    let iconClasses = classnames('fa', {
      'fa-check': this.state.ajaxSuccess,
      'fa-close': this.state.ajaxFail,
      'fa-cog fa-spin': this.state.inProgress
    });

    return (
      <li className='todo-list-item'>
        <label className={labelClasses}>
          <input
            type="checkbox"
            value={this.state.done}
            checked={this.state.done}
            onChange={this.handleChecked}
            defaultChecked={this.state.done}
            defaultValue={this.state.done}
          />
          <ContentEditable
            {...this.props.data}
            id={this.state.id}
            text={this.state.text}
            classnames={this.state.textClasses}
          />
          <div className='todo-list-item-metadata'>
            <span className='timestamp'>{this.convertTimestamp(this.state.timestamp)}</span>
            <span className={ajaxClasses}><i className={iconClasses}></i></span>
          </div>
        </label>
      </li>
    )
  }
}

TodoListItem.propTypes = {}
TodoListItem.defaultProps = {}

