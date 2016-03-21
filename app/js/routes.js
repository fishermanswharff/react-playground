import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import TodoApp from './components/todoApp.jsx';
import TodoLists from './components/todoLists.jsx';
import TodoList from './components/todoList.jsx';
import Dashboard from './components/dashboard.jsx';
import UserDashboard from './components/userDashboard.jsx';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={TodoApp}>
      <IndexRoute component={Dashboard} />
      <Route path="/user/:userId" component={UserDashboard} />
      <Route path="/lists/:listId" component={TodoList} />
    </Route>
  </Router>
);

export default routes;
