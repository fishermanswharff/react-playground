import React from 'react';

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
    this.setState({done: !this.state.done});
    var doneRef = new Firebase(`https://jwtodoapp.firebaseio.com/tasks/${this.props.data.project}/${this.props.id}/done`);
    doneRef.set(this.state.done, (error) => {
      if(error){
        console.log('synchronization failed')
      } else {
        console.log('synchro succeeded!!');
      }
    });
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            value={this.state.done}
            checked={this.state.done}
            onChange={this.handleChecked}
          />
          <span dangerouslySetInnerHTML={this.createMarkup(this.state.text)}></span>
        </label>
      </div>
    )
  }
}

TodoListItem.propTypes = {}
TodoListItem.defaultProps = {
  // firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
}


// <input type='checkbox' value={this.state.done} checked={this.state.done} onChange={this.handleChecked} />
