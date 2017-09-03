//@ flow
import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

export default class Container extends Component {
  props: {
    style: array
  }
  render() {
    
    let styles = {
      width: '99%',
      height: '100%',
      maxWidth: '1080px',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxSizing: 'border-box',
      paddingTop: 10,
      paddingBottom: 15,
      minHeight: 300,
      position: 'relative'
    };

    for (let i in this.props.style) { 
      if (this.props.style.hasOwnProperty(i))
        styles[i] = this.props.style[i]; 
    }

    return (
      <Grid style={styles} fluid>
        {this.props.children}
      </Grid>
    );

  }
}
