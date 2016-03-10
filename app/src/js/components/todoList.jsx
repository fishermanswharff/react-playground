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
    this.items = [];
    var firebaseRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`);
    firebaseRef.orderByKey().on('child_added', (snapshot, prev) => {
      this.items.push({key: snapshot.key(), item: snapshot.val()});
      this.setState({ items: this.items });
    });
  }

  componentDidMount() {
    this.loadListFromServer();
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.listId;
    let newId = this.props.params.listId;
    if (newId !== oldId)
      this.loadListFromServer();
  }

  componentWillUnmount() {
    console.log('TodoItem will unmount');
  }

  newItemSubmit(e) {
    e.preventDefault();
    var todoRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`);
    todoRef.push({
      done: false,
      project: this.props.params.listId,
      text: this.state.newItemText,
      timestamp: Date.now()
    }, function(error){
      if(error){
        console.log('sync failed :(');
      } else {
        this.setState({ newItemText: '' });
      }
    });
  }

  newItemChange(e) {
    this.setState({ newItemText: e.target.value });
  }

  render() {
    return (
      <div className='todo-list-container'>
        <ul className='todo-list'>
          { this.state.items.map(this.createItem) }
        </ul>
        <form onSubmit={ this.newItemSubmit }>
          <input onChange={ this.newItemChange } value={ this.state.newItemText } placeholder='Create a new item'/>
          <button>Add Item</button>
        </form>
      </div>
    )
  }
}

TodoList.propTypes = {}

TodoList.defaultProps = {}
