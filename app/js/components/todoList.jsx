import BaseComponent from './base.jsx';
import TodoListItem from './todoListItem.jsx';
import { Link } from 'react-router';
import TodoListNotes from './todoListNotes.jsx';

export default class TodoList extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      notes: '',
      newItemText: ''
    };

    this.bind('loadListFromServer', 'createItem', 'newItemSubmit', 'newItemChange', 'createNotes');
  }

  createItem(object,index,array) {
    return <TodoListItem key={object.key} data={object.item} id={object.key} />
  }

  createNotes(){
    return <TodoListNotes {...this.props} />
  }

  loadListFromServer() {
    this.setState({ items: [] });
    var listitems = [],
        todosRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`);

    todosRef.on('child_added', (snapshot, prev) => {
      listitems.push({key: snapshot.key(), item: snapshot.val()});
      this.setState({ items: listitems });
      return snapshot;
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
    var listRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`);
    listRef.off();
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
        this.setState({newItemText: null});
      }
    });

    promise.then(function(val){
      console.log(val.key(), val);
    });
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
        {this.createNotes()}
        <form onSubmit={ this.archiveDoneItems } >
          <input type='submit' value='Remove Done Items' />
        </form>

      </section>
    )
  }
}

TodoList.propTypes = {}
TodoList.defaultProps = {}
