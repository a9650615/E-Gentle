import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TopBar from '../components/TopBar';
import View from '../components/View';
import theme from '../constant/theme';

const muiTheme = getMuiTheme(theme);

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div style={{width: '100vw', height: '100vh'}}>
          <TopBar />
          <View>{this.props.children}</View>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
}
