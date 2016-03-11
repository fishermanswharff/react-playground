import React from 'react';
import classnames from 'classnames';

export default class TodoListItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleChecked = this.handleChecked.bind(this);
    this.convertTimestamp = this.convertTimestamp.bind(this);

    this.state = {
      done: this.props.data.done,
      text: this.props.data.text,
      timestamp: this.props.data.timestamp,
      project: this.props.data.project,
      id: this.props.id
    };
  }

  createMarkup(string) {
    return { __html: string };
  }

  handleChecked(event) {
    event.preventDefault();
    var doneRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.data.project}/${this.props.id}/done`);
    doneRef.set(!this.state.done, (error) => {
      if(error){
        console.log('synchronization failed')
      } else {
        this.setState({done: !this.state.done});
        this.forceUpdate();
        console.log('synchro succeeded!!');
      }
    });
  }

  convertTimestamp(timestamp){
    var date = new Date(timestamp);
    // var time = date.toTimeString().toString().replace(/GMT-\d+\s\(\w+\)/,'');
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate() + 1;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if(minutes < 10){
      var string = '0'+minutes;
      minutes = string;
    }
    return hours+':'+minutes+' '+month+'/'+day;
  }

  componentDidMount(){}
  componentDidUpdate(prevProps){}
  componentWillUnmount(){}

  render() {
    let textClasses = classnames('label', {'done-true': this.state.done == true});
    let labelClasses = classnames({'checked': this.state.done == true});
    return (
      <li>
        <label className={labelClasses}>
          <input
            type="checkbox"
            value={this.state.done}
            checked={this.state.done}
            onChange={this.handleChecked}
            defaultChecked={this.state.done}
            defaultValue={this.state.done}
          />
          <span contentEditable className={textClasses} dangerouslySetInnerHTML={this.createMarkup(this.state.text)}></span>
          <span className='timestamp'>{this.convertTimestamp(this.state.timestamp)}</span>
        </label>
      </li>
    )
  }
}

TodoListItem.propTypes = {}
TodoListItem.defaultProps = {}
