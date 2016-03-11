import React from 'react';
import classnames from 'classnames';

export default class TodoListItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleChecked = this.handleChecked.bind(this);

    this.state = {
      done: this.props.data.done,
      text: this.props.data.text,
      createdAt: this.props.data.created_at,
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
        setTimeout(()=>{
        }, 100)
        console.log('synchro succeeded!!');
      }
    });
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
          <span className={textClasses} dangerouslySetInnerHTML={this.createMarkup(this.state.text)}></span>
        </label>
      </li>
    )
  }
}

TodoListItem.propTypes = {}
TodoListItem.defaultProps = {}
