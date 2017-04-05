import React, { Component } from 'react';
import style from './View.css';

class View extends Component {
  render() {
    return (
      <div className={style.view}>
        {this.props.children}
      </div>
    );
  }
}

View.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default View;
