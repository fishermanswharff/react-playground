var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <TodoItem key={item.id} data={item} />
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
