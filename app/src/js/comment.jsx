var Comment = React.createClass({
  render: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className='comment'>
        <h3 className='commentAuthor'>{this.props.author}</h3>
        <span dangerouslySetInnerHTML = {{__html: rawMarkup}} />
      </div>
    )
  }
});