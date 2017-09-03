// @flow
import React, { Component } from 'react';
import style from './View.css';

class View extends Component {
  props: {
    children: Children
  }
  render() {
    return (
      <div className={style.view}>
        {this.props.children}
      </div>
    );
  }
}

export default View;
