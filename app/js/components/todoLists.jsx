import React from 'react';
import { render } from 'react-dom';
import TodoItem from './todoItem.jsx';
import classnames from 'classnames';
import Refire from '../firebaseModule/Refire.js';

export default class TodoLists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
    this.requests = new Refire({props: this.props});

    this.loadListsFromServer = this.loadListsFromServer.bind(this);
    this.listsPromiseHandler = this.listsPromiseHandler.bind(this);
    this._valueChangeSuccess = this._valueChangeSuccess.bind(this);
    this._valueChangeError = this._valueChangeError.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  createItem(item) {
    return <TodoItem key={item.key} data={item.list} firebaseKey={item.key} authData={this.props.authData} />
  }

  loadListsFromServer() {
    this.setState({lists: []});
    this.requests.getAllLists()
      .then(this.listsPromiseHandler)
      .catch((reason) => {
        console.log(reason);
      });
  }

  listsPromiseHandler(object){
    var lists = []
    for(var key in object)
      lists.push({key: key, list: object[key]});
    this.setState({lists: lists});
  }

  componentDidMount(){
    this.loadListsFromServer();
    let listsRef = new Firebase('https://jwtodoapp.firebaseio.com/projects');
    listsRef.on('value', this._valueChangeSuccess, this._valueChangeError)
  }

  _valueChangeSuccess(dataSnapshot) {
    this.listsPromiseHandler(dataSnapshot.val());
  }

  _valueChangeError(error) {
    console.log('todoLists on value error: ', error);
  }

  render() {
    let classes = classnames('todo-lists-container', {
      'active': this.state.open,
    });

    return(
      <div>
        <section className={classes}>
          <ul key='todo-lists' className='todo-lists'>{this.state.lists.map(this.createItem)}</ul>
        </section>
        <div className='todo-lists-children'>{this.props.children}</div>
      </div>
    )
  }
}
