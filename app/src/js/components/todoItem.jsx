import React from 'react';

class TodoItem extends React.Component {
  render() {
    return (
      <li>{this.props.data.name}</li>
    )
  }
}

export default TodoItem;
