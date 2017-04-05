import {
  EH_LIST_SUCCESS,
  EH_LIST_FAILURE
} from '../actions/EhData';

const INITIAL_STATE = { loading: false, data: {}, page: 0, status: 'init' }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EH_LIST_SUCCESS:
      return {...state, loading: false, data: action.data, page: action.page, status: 'loaded'};
    case EH_LIST_FAILURE:
      return {...state, loading: false, status: 'failed'}
    default:
      return state
  }
}