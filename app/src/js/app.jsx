import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import TodoApp from './components/todoApp';
import TodoLists from './components/todoLists';
import TodoList from './components/todoList';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={TodoApp}>
      <Route path="/lists" component={TodoLists}>
        <Route path="/lists/:listId" component={TodoList} />
      </Route>
    </Route>
  </Router>
), document.getElementById('todo-list'));
