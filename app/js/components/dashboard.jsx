import React from 'react';
import BaseComponent from './base.jsx';

export default class Dashboard extends BaseComponent {

  constructor(){
    super();
    this.state = {};
  }

  render(){
    return(
      <div>
        <p>Hello world</p>
      </div>
    )
  }
}
