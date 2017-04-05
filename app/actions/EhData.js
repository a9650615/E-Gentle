import DataLoader from '../utils/DataLoader'

export const EH_LIST = 'EH_LIST'
export const EH_LIST_SUCCESS = 'EH_LIST_SUCCESS'
export const EH_LIST_FAILURE = 'EH_LIST_FAILURE'

export const ehList = (page = 0) => {
  return (dispatch) => {
    DataLoader.getGalleryList()
      .then( data => dispatch(ehListSuccess(data, page)) )
      .catch( data => dispatch(ehListFailure(data, page)) )
  }
}

export const ehListSuccess = (data, page) => {
  return {
    type: EH_LIST_SUCCESS,
    data,
    page
  }
}

export const ehListFailure = (data, page) => {
  return {
    type: EH_LIST_FAILURE,
    data,
    page
  }
}