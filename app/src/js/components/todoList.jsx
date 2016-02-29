import React from 'react';
import TodoListItem from './todoListItem'
import { Link } from 'react-router'

export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.loadListFromServer = this.loadListFromServer.bind(this);
    this.createItem = this.createItem.bind(this);
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
    // console.log('TodoItem did mount');
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

  render() {
    return (
      <div>
        <ul>
          { this.state.items.map(this.createItem) }
        </ul>
      </div>
    )
  }
}

TodoList.propTypes = {}

TodoList.defaultProps = {}
