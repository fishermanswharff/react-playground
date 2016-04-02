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
      newItemText: '',
      listName: ''
    };
    this.firebase = {}
    this.bind('loadListFromServer', 'createItem', 'newItemSubmit', 'newItemChange', 'createNotes', 'loadListData');
  }

  createItem(object,index,array) {
    return <TodoListItem key={object.key} data={object.item} id={object.key} />
  }

  createNotes(){
    return <TodoListNotes {...this.props} listName={this.state.listName} />
  }

  resetData(){
    this.firebase = {
      projectRef: new Firebase(`https://jwtodoapp.firebaseio.com/projects/${this.props.params.listId}`),
      todosRef: new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`),
      notesRef: new Firebase(`https://jwtodoapp.firebaseio.com/notes/${this.props.params.listId}`),
      membersRef: new Firebase(`https://jwtodoapp.firebaseio.com/members/${this.props.params.listId}`)
    }

    this.loadListData();
    this.loadListFromServer();
  }

  loadListFromServer() {
    this.setState({ items: [] });
    var listitems = [];

    this.firebase.todosRef.on('child_added', (snapshot, prev) => {
      listitems.push({key: snapshot.key(), item: snapshot.val()});
      this.setState({ items: listitems });
      return snapshot;
    });
  }

  loadListData(){
    this.firebase.projectRef.once('value', (snapshot) => {
      let name = snapshot.val().name;
      this.setState({ listName: name });
    });
  }

  componentDidMount() {
    this.resetData();
    this.firebase.todosRef.on('child_removed', (datasnapshot) => {
      this.loadListFromServer();
    }, (errorObject) => {
      console.log(errorObject);
    });
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.listId;
    let newId = this.props.params.listId;
    if (newId !== oldId) this.resetData();
  }

  componentWillUnmount() {
    this.firebase.todosRef.off();
  }

  newItemSubmit(e) {
    e.preventDefault();
    var promise = this.firebase.todosRef.push({
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
