import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import TodoApp from './components/todoApp';
import TodoLists from './components/todoLists'

ReactDOM.render(<TodoApp/>, document.getElementById('todo-list'));

render((
  <Router history={browserHistory}>
    <Route path="/" component={TodoApp}>
    </Route>
    <Route path="/lists/:listId" component={TodoLists}/>
  </Router>
), document.body);
