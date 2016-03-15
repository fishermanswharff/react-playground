import React from 'react';
import { Link } from 'react-router'

export default class TodoItem extends React.Component {

  constructor(props){
    super(props);
    this.getChildren = this.getChildren.bind(this);

    this.state = {
      numTasks: 0
    }
  }

  getChildren(){
    var todoItemsRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.firebaseKey}`);
    todoItemsRef.once('value', (dataSnapshot) => {
      this.setState({numTasks: dataSnapshot.numChildren()});
    });
  }

  componentDidMount(){
    this.getChildren();
  }

  render() {
    return (
      <li key={this.props.data.name}>
        <Link activeStyle={{ color: '#0088ff' }} to={`/lists/${this.props.firebaseKey}`}>
          {this.props.data.name}
        </Link>
        {this.state.numTasks}
      </li>
    )
  }
}
