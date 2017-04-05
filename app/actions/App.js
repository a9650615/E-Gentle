export const APP_DATA = 'APP_DATA'
export const APP_DATA_FINISH = 'APP_DATA_FINISH' 

export const APP_TAB = 'APP_TAB'

export const appData = () => {
  return {
    type: APP_DATA
  }
}

export const appDataFinish = () => {
  return {
    type: APP_DATA_FINISH
  }
}

export const appTab = (tab) => {
  return {
    type: APP_TAB,
    tab
  }
}
