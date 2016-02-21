import React from 'react';
import TodoItem from './todoItem'

export default class TodoLists extends React.Component {

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

TodoLists.defaultProps = {
  items: []
}
