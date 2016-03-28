import React from '../node_modules/react';
import Router from '../node_modules/react-router';
import ReactTestUtils from '../node_modules/react-addons-test-utils';
import TodoApp from '../app/js/components/todoApp.jsx';

describe('TodoApp', () => {

  var component;

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(<TodoApp />);
  });

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('is a react component', () => {
    // expect(ReactTestUtils.isDOMComponent(component)).toEqual(true);
  });

  it('handles an auth event', () => {
  });

  afterEach(() => {});
});
