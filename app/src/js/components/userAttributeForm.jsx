import React from 'react';

export default class UserAttributeForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.setState({ attribute: this.props.attribute, value: this.props.value });
  }

  handleChange(e){
    this.setState({value: e.target.value});
  }

  render(){
    let formId = `user-attribute-${this.state.attribute}`
    let inputId = `attribute-${this.state.attribute}`

    return(
      <form className='user-attributes' id={formId} onSubmit={this.submitAttribute}>
        <div className='form-group'>
          <input type='text' id={inputId} value={this.state.value} onChange={this.handleChange} required/>
          <label htmlFor={inputId}>{this.state.attribute}</label>
        </div>
      </form>
    )
  }
}
