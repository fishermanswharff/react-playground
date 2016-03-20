import React from 'react';
import LoginForm from './loginForm.jsx';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.generateUserPath = this.generateUserPath.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleUnAuth = this.handleUnAuth.bind(this);
    this.state = {
      active: false
    }
  }

  handleMenuClick(e){
    this.setState({ active: !this.state.active });
  }

  generateUserPath(){
    var path = ''
    !!this.props.authData ? path = `/user/${this.props.authData.uid}` : path = '/';
    return path;
  }

  handleUnAuth(authData){
    this.props.onAuthEvent(authData);
  }

  handleAuth(authData){
    this.props.onAuthEvent(authData);
  }

  render(){

    let menuIconClasses = classnames('menu-icon', {
      'active': this.state.active,
    });

    return(
      <nav className='navbar'>
        <ul className='nav-list links'>
          <li className='nav-list-item menu'>
            <a href='#' id='menu-button' className={menuIconClasses} onClick={this.handleMenuClick}>
              <span className='menu-icon__text'></span>
              <span className='display_text'></span>
            </a>
          </li>
          <li className='nav-list-item'>
            <IndexLink to="/" className='home' title='Home'>
              <i className='fa fa-home'></i>
            </IndexLink>
          </li>
          <li className='nav-list-item large'>
            <Link className='settings' to={this.generateUserPath()}>
              <i className='fa fa-cogs'></i>
            </Link>
          </li>
        </ul>
        <ul className='nav-list auth'>
          <li className='nav-list-item'>
            <LoginForm
              authData={ this.props.authData }
              onUnAuth={this.handleUnAuth}
              onAuth={this.handleAuth}
              {...this.props}
            />
          </li>
        </ul>
      </nav>
    )
  }
}
