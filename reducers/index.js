// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import appReducer from './AppReducer';
import ehDataReducer from './EhDataReducer';

const rootReducer = combineReducers({
  routing,
  appReducer,
  ehDataReducer
});

export default rootReducer;
