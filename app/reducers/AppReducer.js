import {
  APP_DATA,
  APP_TAB,
  APP_LIST_DETAIL,
  APP_LIST_DETAIL_FINISH
} from '../actions/App';

const INITIAL_STATE = { loading: false }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case APP_DATA:
      return {...state, loading: true}
    case APP_TAB:
      return {...state, loading: false, tab: action.tab}
    default:
      return state
  }
}
