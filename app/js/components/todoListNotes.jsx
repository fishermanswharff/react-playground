import BaseComponent from './base.jsx';
import ReactQuill from 'react-quill';

export default class TodoListNotes extends BaseComponent {
  constructor(props){
    super(props);
    this.bind('onTextChange', 'createMarkup','loadTextFromServer','onTextDoneUpdate');
    this.state = {
      text: ''
    }
  }

  createMarkup(string) {
    return { __html: string };
  }

  loadTextFromServer(){
    var notesRef = new Firebase(`https://jwtodoapp.firebaseio.com/notes/${this.props.params.listId}/text`);
    notesRef.on('value', (snapshot) => {
      this.setState({text: snapshot.val()});
    });
  }

  componentDidMount(){
    this.loadTextFromServer()
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
      <ReactQuill theme="snow" onChange={this.onTextChange} value={this.state.text} />
    );
  }
}

TodoListNotes.propTypes = {
  text: React.PropTypes.string
};

TodoListNotes.defaultProps = {};
