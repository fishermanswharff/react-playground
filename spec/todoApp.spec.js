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

  let utils = TestUtils,
      component = utils.renderIntoDocument(<TodoApp/>),
      node = utils.findRenderedDOMComponentWithClass(component, 'todo-app-main-container');

  beforeEach(() => {
    component.setState({ authData: null });
  });

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('has props', () => {
    expect(component.props).toBeDefined();
    expect(component.props).toEqual(jasmine.any(Object));
  });

  it('has state', () => {
    expect(component.state).not.toBeNull();
    expect(component.state.authData).toBeNull();
  });

  it('is has children components', () => {
    let nav = utils.findRenderedDOMComponentWithTag(component, 'nav');
    expect(nav).toBeDefined();
  });

  it('responds to authEvents', () => {
    // ??
  });

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
