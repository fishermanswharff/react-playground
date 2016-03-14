import React from 'react';
import LoginForm from './loginForm';
import { Link, IndexLink } from 'react-router';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){

    return(
      <nav className='navbar'>
        <ul className='nav-list links'>
          <li className='nav-list-item'>
            <IndexLink to="/" className='home' title='Home'>
              <i className='fa fa-home'></i>
            </IndexLink>
          </li>
          <li className='spacer'></li>
          <li className='nav-list-item'>
            <Link className='settings' to='/'>
              <i className='fa fa-cogs'></i>
            </Link>
          </li>
        </ul>
        <ul className='nav-list auth'>
          <li className='nav-list-item'>
            <LoginForm authData={ this.props.authData } />
          </li>
        </ul>
      </nav>
    )
  }
}
