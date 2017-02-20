import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.default || ''
    };

    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.getValue = this.input.getValue.bind(this.input);
  }
  

  clear() {
    this.setState({text: ''});
  }

  _change() {
    this.setState({text: this.input.getValue()});
  }

  getValue() {
    return this.input.getValue();
  }

  render() {
    const element = React.cloneElement(
       <TextField value={this.state.text} ref={(ele) => this.input = ele} onChange={this._change.bind(this)}/>,
       this.props
     );
    return (
     element
    );
  }
}

export default TextInput;
