import React from 'react';
import TodoItem from './todoItem';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

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
      <section>
        <div className='todo-lists-container'>
          <ul className='todo-lists'>
            {this.props.items.map((item,idx) => {
              return <TodoItem key={item.key} data={item.list} firebaseKey={item.key} />
            })}
          </ul>
        </div>
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
