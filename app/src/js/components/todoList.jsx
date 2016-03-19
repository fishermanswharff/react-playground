import React from 'react';
import TodoListItem from './todoListItem'
import { Link } from 'react-router'

export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItemText: ''
    };

    this.loadListFromServer = this.loadListFromServer.bind(this);
    this.createItem = this.createItem.bind(this);
    this.newItemSubmit = this.newItemSubmit.bind(this);
    this.newItemChange = this.newItemChange.bind(this);

  }

  createItem(object,index,array) {
    return <TodoListItem key={object.key} data={object.item} id={object.key} />
  }

  loadListFromServer() {
    this.setState({ items: [] });
    var listitems = [];
    var firebaseRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`);
    firebaseRef.orderByKey().on('child_added', (snapshot, prev) => {
      listitems.push({key: snapshot.key(), item: snapshot.val()});
      this.setState({ items: listitems });
    });
  }

  componentDidMount() {
    this.loadListFromServer();
    var listRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`);
    listRef.on('child_removed', (datasnapshot) => {
      this.loadListFromServer();
    }, (errorObject) => {
      console.log(errorObject);
    });
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.listId;
    let newId = this.props.params.listId;
    if (newId !== oldId) this.loadListFromServer();
  }

  componentWillUnmount() {
    // console.log('TodoItem will unmount');
  }

  newItemSubmit(e) {
    e.preventDefault();
    var todoRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`);
    var promise = todoRef.push({
      done: false,
      project: this.props.params.listId,
      text: this.state.newItemText,
      timestamp: Date.now()
    }, (error) => {
      if(error){
        console.log('sync failed :(');
      } else {
        console.log('success');
      }
    });

    promise.then(function(val){
      console.log(val.key());
    });

    return false;
  }

  newItemChange(e) {
    this.setState({ newItemText: e.target.value });
  }

  render() {
    return (
      <section className='todo-list-container'>
        <header></header>
        <ul className='todo-list'>
          { this.state.items.map(this.createItem) }
        </ul>
        <div className='form-container'>
          <form id='new-list-item' onSubmit={ this.newItemSubmit }>
            <div className='form-group'>
              <input id='new-list-item' type='text' onChange={ this.newItemChange } value={ this.state.newItemText } required/>
              <label htmlFor='new-list-item'>new todo:</label>
            </div>
            <div className='form-group'>
              <button type='submit'>Add Item</button>
            </div>
          </form>
        </div>
        <form onSubmit={ this.archiveDoneItems } >
          <input type='submit' value='Remove Done Items' />
        </form>
      </section>
    )
  }
}

TodoList.propTypes = {}
TodoList.defaultProps = {}
