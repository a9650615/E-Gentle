import {
  EH_LIST_SUCCESS,
  EH_LIST_FAILURE,
  EH_LIST_DETAIL,
  EH_LIST_DETAIL_SUCCESS,
  EH_LIST_DETAIL_FAILURE
} from '../actions/EhData';

const INITIAL_STATE = {
  loading: false,
  data: {},
  page: 0,
  status: 'init',
  detail: {},
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EH_LIST_SUCCESS:
      return {...state, loading: false, data: action.data, page: action.page, status: 'loaded'};
    case EH_LIST_FAILURE:
      return {...state, loading: false, status: 'failed'}
    case EH_LIST_DETAIL:
      return {...state, loading: true, parameter: action.parameter}
    case EH_LIST_DETAIL_SUCCESS:
      return {...state, loading: false, detail: action.detail}
    case EH_LIST_DETAIL_FAILURE:
      return {...state, loading: false, detail: false}
    default:
      return state
  }
}
