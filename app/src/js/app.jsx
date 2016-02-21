import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import TodoApp from './components/todoApp';

ReactDOM.render(
  <TodoApp/>, document.getElementById('todo-list')
);
