var CommentBox = React.createClass({displayName: "CommentBox",
  loadCommentsFromServer: function(){
    var _this = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.props.url, true);
    request.onreadystatechange = function(){
      switch(this.readyState){
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          if(request.status >= 200 && request.status < 400){
            _this.setState({data: JSON.parse(request.responseText)});
          } else {
            console.error(_this.props.url, request.status);
          }
          break;
        default:
          break;
      }
    };
    request.onerror = function(){};
    request.send();
  },
  getInitialState: function(){
    return {data: []};
  },
  handleCommentSubmit: function(comment){
    var _this = this;
    var comments = _this.state.data;
    var newComments = comments.concat([comment]);
    _this.setState({data: newComments});

    var request = new XMLHttpRequest();
    request.open('POST', this.props.url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onreadystatechange = function(){
      switch(this.readyState){
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          if(request.status >= 200 && request.status < 400){
            _this.setState({data: JSON.parse(request.responseText)});
          } else {
            console.error(_this.props.url, request.status);
          }
          break;
        default:
          break;
      }
    };
    request.send(comment);
    // TODO: submit to the server and refresh the list
  },
  componentDidMount: function(){
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
    );
  }
});

React.render(
  React.createElement(CommentBox, {url: "data/comments.json", pollInterval: 2000}),
  document.getElementById('comments')
);