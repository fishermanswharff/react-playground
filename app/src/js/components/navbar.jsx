import React from 'react';
import LoginForm from './loginForm';
import { Link, IndexLink } from 'react-router';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.generateUserPath = this.generateUserPath.bind(this);
    this.state = {}
  }

  generateUserPath(){
    var path = ''
    !!this.props.authData ? path = `/user/${this.props.authData.uid}` : path = '/';
    return path;
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
          <li className='nav-list-item'>
            <Link className='settings' to={this.generateUserPath()}>
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
