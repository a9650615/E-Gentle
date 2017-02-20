import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class Href extends Component {
  _handlePageChange( page = '', e) {
    if (e.nativeEvent.which === 1) {
      e.nativeEvent.preventDefault();
      browserHistory.push(page);
    }
  }

  render() {
    let style = this.props.style || {};
    if (this.props.underLine === false)
      style.textDecoration = 'none';

    return (
      <a onClick={this._handlePageChange.bind(this, this.props.href)} 
        href={this.props.href} 
        onTouchTap={this.props.onTouchTap}
        style={style}
      >
          {this.props.children}
      </a>
    );
  }
}

export default Href;
