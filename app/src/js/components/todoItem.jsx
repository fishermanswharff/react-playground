import React from 'react';
import { Link } from 'react-router'

export default class TodoItem extends React.Component {

  render() {
    return (
      <li key={this.props.data.name}>
        <Link activeStyle={{ color: 'red' }} to={`/lists/${this.props.firebaseKey}`}>
          {this.props.data.name}
        </Link>
      </li>
    )
  }
}
