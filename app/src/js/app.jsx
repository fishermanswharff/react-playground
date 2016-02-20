import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import LoginForm from './components/LoginForm';

ReactDOM.render(
  <TodoApp/>, document.getElementById('todo-list')
);
