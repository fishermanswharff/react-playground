import React from 'react';
import { render } from 'react-dom';
import TodoItem from './todoItem';
import classnames from 'classnames';

export default class TodoLists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.createItem = this.createItem.bind(this);
  }

  createItem(item) {
    return <TodoItem key={item.key} data={item.list} firebaseKey={item.key} authData={this.props.authData} />
  }

  render() {

    var view;

    let classes = classnames('todo-lists-container', {
      'active': this.state.open,
    });

    return(
      <section className={classes}>
        <ul className='todo-lists'>{this.props.items.map(this.createItem)}</ul>
        <div className='todo-lists-children'>{this.props.children}</div>
      </section>
    )
  }
}

TodoLists.defaultProps = {
  items: []
}
