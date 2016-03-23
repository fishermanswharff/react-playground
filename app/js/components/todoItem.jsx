import React from 'react';
import Refire from '../firebaseModule/Refire.js';
import { Link } from 'react-router';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class TodoItem extends React.Component {

  constructor(props){
    super(props);
    this.refire = new Refire({baseUrl: FIREBASE_REFS.tasksRef, props: this.props});
    this.getChildren = this.getChildren.bind(this);
    this.handleChildCountPromise = this.handleChildCountPromise.bind(this);
    this.state = {
      numTasks: 0
    }
  }

  getChildren(){
    this.refire.fetchChildCount({ key: `/${this.props.firebaseKey}`, success: this.handleChildCountPromise, array: false, context: this });
  }

  handleChildCountPromise(count){
    this.setState({numTasks: count});
    this.forceUpdate();
  }

  componentDidUpdate(prevProps){
    if(prevProps.authData !== this.props.authData){
      this.getChildren();
    }
  }

  componentDidMount(){
    this.getChildren();
  }

  render() {
    return (
      <li key={this.props.data.name}>
        <Link activeClassName="active" to={`/lists/${this.props.firebaseKey}`}>
          {this.props.data.name}
        </Link>
        {this.state.numTasks}
      </li>
    )
  }
}
