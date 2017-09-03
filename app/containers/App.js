import React, { Component } from 'react';
import type { Child } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import TopBar from '../components/TopBar';
import View from '../components/View';
import theme from '../constant/theme';

const muiTheme = createMuiTheme(theme)

export default class App extends Component {
  props: {
    children: Child
  }
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div style={{width: '100vw', height: '100vh'}}>
          <TopBar />
          <View>{this.props.children}</View>
        </div>
      </MuiThemeProvider>
    );
  }
}
