import React from 'react'
import { render } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import TodoApp from '../app/js/components/todoApp.jsx';
import TodoList from '../app/js/components/todoList.jsx';
import Dashboard from '../app/js/components/dashboard.jsx';
import UserDashboard from '../app/js/components/userDashboard.jsx';
import Stub from './support/testStub.js';

describe('TodoApp', () => {

  var component = ReactDOM.render(<Stub>{() => <TodoApp />}</Stub>, document.body),
      componentNode,
      utils = TestUtils;

  beforeEach(() => {
    // do some setup
  });

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('is a react component with children', () => {
    let nav = utils.findRenderedDOMComponentWithTag(component, 'nav');
    expect(nav).toBeDefined();
  });

  it('handles an auth event', () => {});

  afterEach(() => {
    // do some teardown
  });
});

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={TodoApp}>
      <IndexRoute component={Dashboard} />
      <Route path="/user/:userId" component={UserDashboard} />
      <Route path="/lists/:listId" component={TodoList} />
    </Route>
  </Router>
)
