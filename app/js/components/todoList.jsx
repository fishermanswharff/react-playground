import BaseComponent from './base.jsx';
import TodoListItem from './todoListItem.jsx';
import { Link } from 'react-router';
import TodoListNotes from './todoListNotes.jsx';
import TodoListItemForm from './todoListItemForm.jsx';

export default class TodoList extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      notes: '',
      newItemText: '',
      listName: '',
      authData: null
    };
    this.firebase = {}
    this.bind('loadListFromServer', 'createItem', 'createNotes', 'loadListData');
  }

  createItem(object,index,array) {
    return <TodoListItem key={object.key} data={object.item} id={object.key} />
  }

  createNotes(){
    if(this.state.authData){
      return <TodoListNotes {...this.props} listName={this.state.listName} />
    } else {
      return <div></div>
    }
  }

  createNewTodoForm(){
    if(this.state.authData){
      return <TodoListItemForm {...this.props} listName={this.state.listName} firebase={this.firebase} />
    } else {
      return <div></div>
    }
  }

  resetData(){
    this.firebase = {
      baseRef: new Firebase(`https://jwtodoapp.firebaseio.com`),
      projectRef: new Firebase(`https://jwtodoapp.firebaseio.com/projects/${this.props.params.listId}`),
      todosRef: new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.params.listId}`),
      notesRef: new Firebase(`https://jwtodoapp.firebaseio.com/notes/${this.props.params.listId}`),
      membersRef: new Firebase(`https://jwtodoapp.firebaseio.com/members/${this.props.params.listId}`)
    }

    this.loadListData();
    this.loadListFromServer();
    this.state.authData = this.firebase.baseRef.getAuth();
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

  render() {

    var view;

    if(this.state.authData){
      view = <section className='todo-list-container'>
        <header></header>
        <ul className='todo-list'>
          { this.state.items.map(this.createItem) }
        </ul>
        {this.createNewTodoForm()}
        {this.createNotes()}
        <form onSubmit={ this.archiveDoneItems } >
          <input type='submit' value='Remove Done Items' />
        </form>
      </section>
    } else {
      view = <div></div>
    }

    return view;
  }
}

TodoList.propTypes = {}
TodoList.defaultProps = {}
