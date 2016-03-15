import React from 'react';
import TodoItem from './todoItem';
import { render } from 'react-dom';

export default class TodoLists extends React.Component {

  constructor(props) {
    super(props);
    this.createItem = this.createItem.bind(this);
  }

  createItem(item) {
    return <TodoItem key={item.key} data={item.list} firebaseKey={item.key} />
  }

  render() {
    return(
      <section className='todo-lists-container'>
        <header></header>
        <ul className='todo-lists'>
          {this.props.items.map(this.createItem)}
        </ul>
        <div className='todo-lists-children'>
          {this.props.children}
        </div>
      </section>
    )
  }
}

TodoLists.defaultProps = {
  items: []
}
