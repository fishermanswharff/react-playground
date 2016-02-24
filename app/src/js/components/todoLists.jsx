import React from 'react';
import TodoItem from './todoItem';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

export default class TodoLists extends React.Component {

  contructor(props) {
    this.state = {};
    this.createItem = this.createItem.bind(this);
  }

  createItem(item) {
    return <TodoItem key={item.key} data={item.list} firebaseKey={item.key} />
  }

  render() {
    return(
      <ul>
        {this.props.items.map((item,idx) => {
          return <TodoItem key={item.key} data={item.list} firebaseKey={item.key} />
        })}
        {this.props.children}
      </ul>
    )
  }

}

TodoLists.defaultProps = {
  items: []
}
