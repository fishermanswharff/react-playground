import React from 'react';

export default class UserAttributeForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.onUserAttrChange = this.onUserAttrChange.bind(this);
  }

  componentDidMount(){
    this.setState({ attribute: this.props.attribute, value: this.props.value });
  }

  handleChange(e){
    this.setState({value: e.target.value});
    var userAttrRef = new Firebase(`https://jwtodoapp.firebaseio.com/users/${this.props.uid}/${this.props.attribute}`);
    userAttrRef.set(e.target.value, this.onUserAttrChange);
  }

  onUserAttrChange(error){
    if(error){
      this.setState({ attrChanged: false, ajaxSuccess: false, inProgress: false });
    } else {
      this.setState({ attrChanged: true, ajaxSuccess: true, inProgress: false });
    }
  }

  render(){
    let formId = `user-attribute-${this.state.attribute}`
    let inputId = `attribute-${this.state.attribute}`

    return(
      <form className='user-attributes' id={formId} onSubmit={this.submitAttribute}>
        <div className='form-group'>
          <input type='text' id={inputId} value={this.state.value} onChange={this.handleChange}/>
          <label htmlFor={inputId}>{this.state.attribute}</label>
        </div>
      </form>
    )
  }
}
