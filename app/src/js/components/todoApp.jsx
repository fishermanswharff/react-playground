var TodoApp = React.createClass({
  loadListsFromServer: function(){
    this.items = [];
    this.firebaseRef = new Firebase('https://jwtodoapp.firebaseio.com/projects/');
    this.firebaseRef.on('child_added', function(dataSnapshot) {
      this.items.push(dataSnapshot.val());
      this.setState({ items: this.items });
    }.bind(this));
  },
  getInitialState: function() {
    return { items: [], name: '' };
  },
  onChange: function(e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.firebaseRef.push({
      name: this.state.name
    });
    this.setState({ name: '' });
    // var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    // var nextText = '';
    // this.setState({items: nextItems, text: nextText});
  },
  componentDidMount: function(){
    this.loadListsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function() {
    return (
      <div>
        <LoginForm />
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.name} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});


