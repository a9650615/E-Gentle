/* eslint flowtype-errors/show-errors: 0 */
import React, {Component} from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import GallaryInfo from './containers/GallaryInfoPage';

export default class Routes extends Component {
  render() {
    return (
      <App>
        <Switch>
          <Route path="/info" component={GallaryInfo} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </App>
    )
  }
}
