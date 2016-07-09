import React from 'react';
import ReactDOM from 'react-dom';
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
    this.bind('loadListFromServer','createItem','loadListData','archiveDoneItems');
  }

  createItem(object,index,array) {
    return <TodoListItem
            {...this.props}
            key={object.key}
            data={object.item}
            id={object.key}
            ref={object.key}
            onDone={this.loadListFromServer}
          />
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
    this.setState({authData: this.firebase.baseRef.getAuth()});
    this.firebase.todosRef.on('child_removed', (datasnapshot) => {
      this.loadListFromServer();
    }, (errorObject) => {
      console.log(errorObject);
    });
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

  archiveDoneItems(e){
    e.preventDefault();
    let doneTodos = this.state.items.filter(obj => { return obj.item.done });
    doneTodos.forEach(obj => {
      let todoKey = obj.key,
          projectKey = obj.item.project,
          childRef = this.firebase.todosRef.child(`${obj.key}`);

      childRef.remove(err => {
        if(err) { console.log(`Todo ${todoKey}/${obj.item.text} was not removed.`) }
        else {
          let archiveRef = new Firebase(`https://jwtodoapp.firebaseio.com/archive/${this.props.params.listId}/${obj.key}`);
          archiveRef.set(obj.item, (err) => {
            if(err) { console.log('Failed to write to archive: ', err); }
            else { console.log('Success writing archive.'); }
          });
        }
      });
    });
  }

  componentDidMount() {
    this.resetData();
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
        <TodoListItemForm {...this.props} listName={this.state.listName} firebase={this.firebase} />
        <TodoListNotes {...this.props} listName={this.state.listName} />
        <form onSubmit={ this.archiveDoneItems } >
          <div className='form-group'>
            <button type='submit'>Remove Done Items</button>
          </div>
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
