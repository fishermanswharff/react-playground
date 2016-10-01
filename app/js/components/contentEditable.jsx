import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './base.jsx';
import classnames from 'classnames';
import Refire from '../firebaseModule/Refire.js';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class ContentEditable extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      text: this.props.text,
      classnames: this.props.classnames
    };

    this.bind(
      'createMarkup',
      'clickHandler',
      'emitChange',
      'clickHandler',
      'blurHandler',
      'handleTextUpdate',
      'componentWillReceiveProps'
    );

    this.refire = new Refire({
      baseUrl: `${FIREBASE_REFS.tasksRef}/${this.props.project}/${this.props.id}/text`,
      props: this.props
    });
  }

  createMarkup(string){
    return { __html: string };
  }

  clickHandler(event){
    event.preventDefault();
  }

  emitChange(event){
    let firebase = new Firebase(`${FIREBASE_REFS.tasksRef}/${this.props.project}/${this.props.id}/text`);
    let textContent = ReactDOM.findDOMNode(this).innerHTML;
    firebase.set(textContent);
  }

  handleTextUpdate(){
    console.log('-----------> text update callback');
  }

  blurHandler(event){
    console.log('losing focus on content editable');
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.classnames !== this.props.classnames){
      this.setState({
        classnames: nextProps.classnames
      });
    }
  }

  render(){
    return (
      <span
        contentEditable
        dangerouslySetInnerHTML={this.createMarkup(this.state.text)}
        onClick={this.clickHandler}
        onInput={this.emitChange}
        onBlur={this.blurHandler}
        className={this.state.classnames}
      ></span>
    )
  }
}

ContentEditable.defaultProps = {
  classnames: '',
  html: ''
}
