var TodoApp = React.createClass({
  mixins: [ReactFireMixin],
  firebaseRef: new Firebase('https://jwtodoapp.firebaseio.com/projects/'),
  loadListsFromServer(){
    this.items = [];
    this.firebaseRef.on('child_added', function(dataSnapshot) {
      this.items.push(dataSnapshot.val());
      this.setState({ items: this.items });
    }.bind(this));
  },
  getInitialState() {
    return { items: [], name: '' };
  },
  onChange(e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.firebaseRef.push({
      name: this.state.name,
      timestamp: Date.now()
    });
    this.setState({ name: '' });
  },
  componentDidMount(){
    this.loadListsFromServer();
    this.bindAsArray(this.firebaseRef, 'items');
  },
  componentWillUnmount() {},
  render() {
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
