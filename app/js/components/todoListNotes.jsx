import BaseComponent from './base.jsx';
import Refire from '../firebaseModule/Refire.js';
import { FIREBASE_REFS } from '../constants/FirebaseRefs';
import ReactQuill from 'react-quill';

export default class TodoListNotes extends BaseComponent {
  constructor(props){
    super(props);
    this.bind('onTextChange', 'loadTextFromServer','onTextDoneUpdate');
    this.state = {
      text: ''
    }
  }

  loadTextFromServer(){
    var notesRef = new Firebase(`https://jwtodoapp.firebaseio.com/notes/${this.props.params.listId}/text`);
    notesRef.on('value', (snapshot) => {
      this.setState({text: snapshot.val()});
    });
  }

  componentDidMount(){
    // this.loadTextFromServer()


  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.listId;
    let newId = this.props.params.listId;
    if (newId !== oldId) this.loadTextFromServer();
  }

  onTextChange(value){
    var notesRef = new Firebase(`https://jwtodoapp.firebaseio.com/notes/${this.props.params.listId}/text`);
    notesRef.set(value, this.onTextDoneUpdate);
  }

  onTextDoneUpdate(error){
    if(error){
      this.setState({ajaxFail: true})
    } else {
      this.setState({ajaxSuccess: true})
    }
  }

  render(){
    return (
      <section id={`${this.props.params.listId}-notes`} >
        <header>
          <h3>{this.props.listName} Notes</h3>
        </header>
        <ReactQuill theme="snow" onChange={this.onTextChange} value={this.state.text} />
      </section>
    );
  }
}

TodoListNotes.propTypes = {
  text: React.PropTypes.string
};

TodoListNotes.defaultProps = {};
