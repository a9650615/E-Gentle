import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

class Href extends Component {
  _handlePageChange( page = '', e) {
    if (e.nativeEvent.which === 1) {
      e.nativeEvent.preventDefault();
      //browserHistory.push(page);
      this.props.push(page);
    }
  }

  render() {
    let style = this.props.style || {};
    if (this.props.underLine === false)
      style.textDecoration = 'none';

    return (
      <a 
        onClick={this._handlePageChange.bind(this, this.props.href)} 
        href={this.props.href} 
        onTouchTap={this.props.onTouchTap}
        style={style}
      >
        {this.props.children}
      </a>
    );
  }
}

//export default Href;

const mapStateToProps = (state, ownProps) => {
  return {
    routing: state.routing
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    push: (path) => {
      dispatch(push(path))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Href);
