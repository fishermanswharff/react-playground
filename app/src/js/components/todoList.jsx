import React from 'react';
import TodoItem from './TodoItem'

export default class TodoList extends React.Component {

  contructor(props) {
    this.state = {};
    this.createItem = this.createItem.bind(this);
  }

  createItem(item) {
    return <TodoItem key={item.id} data={item} />
  }

  render() {
    return <ul>{ this.props.items.map(this.createItem) }</ul>
  }
}

TodoList.defaultProps = {
  items: []
}
