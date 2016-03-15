import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import TodoApp from './components/todoApp';
import TodoLists from './components/todoLists';
import TodoList from './components/todoList';
import Dashboard from './components/dashboard';
import UserDashboard from './components/userDashboard';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={TodoApp}>
      <IndexRoute component={Dashboard} />
      <Route path="/user/:userId" component={UserDashboard} />
      <Route path="/lists" component={TodoLists}>
        <Route path="/lists/:listId" component={TodoList} />
      </Route>
    </Route>
  </Router>
), document.getElementById('todo-list'));
