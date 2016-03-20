import React from 'react';
import FirebaseRequest from '../modules/FirebaseRequest';
import { Link } from 'react-router'

export default class TodoItem extends React.Component {

  constructor(props){
    super(props);
    this.request = new FirebaseRequest({props: this.props});
    this.getChildren = this.getChildren.bind(this);
    this.handleChildCountPromise = this.handleChildCountPromise.bind(this);
    this.state = {
      numTasks: 0
    }
  }

  getChildren(){
    this.request.listChildCount(this.props.firebaseKey)
      .then(this.handleChildCountPromise)
      .catch((reason) => {
        console.log(reason);
      });
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
