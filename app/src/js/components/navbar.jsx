import React from 'react';
import LoginForm from './loginForm';
import { IndexLink } from 'react-router';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return(
      <nav className='navbar'>
        <ul className='nav-list'>
          <li><LoginForm authData={ this.props.authData } /></li>
          <IndexLink to="/">Home</IndexLink>
        </ul>
      </nav>
    )
  }
}
