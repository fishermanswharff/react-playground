import BaseComponent from './base.jsx';
import { render } from 'react-dom';
import TodoItem from './todoItem.jsx';
import classnames from 'classnames';
import Refire from '../firebaseModule/Refire.js';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class TodoLists extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };

    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props});
    this.bind('createItem','handleClick');
  }

  createItem(item) {
    let key = Object.keys(item)[0];
    return <TodoItem key={key} data={item[key]} firebaseKey={key} authData={this.props.authData} />
  }

  componentDidMount(){
    this.refire.bindToState({
      key: 'projects',
      context: this,
      state: 'lists',
      array: true
    });
  }

  handleClick(e){
    this.props.onListClicked(e);
  }

  render() {
    let classes = classnames('todo-lists-container', {
      'active': this.state.open,
    });

    return(
      <div onClick={this.handleClick}>
        <section className={classes}>
          <ul key='todo-lists' className='todo-lists'>
            {this.state.lists.map(this.createItem)}
          </ul>
        </section>
        <div className='todo-lists-children'>{this.props.children}</div>
      </div>
    )
  }
}
