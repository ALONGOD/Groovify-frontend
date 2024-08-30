export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOGGLE_DETAILS_SIDEBAR = 'TOGGLE_DETAILS_SIDEBAR'
export const SET_DETAILS_SIDEBAR = 'SET_DETAILS_SIDEBAR'

const initialState = {
  isLoading: false,
  detailsSidebarMode: false, /*queueDetails or songDetails or empty */
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case TOGGLE_DETAILS_SIDEBAR:
      return { ...state, detailsSidebarMode: !state.detailsSidebarMode }
    case SET_DETAILS_SIDEBAR:
      return { ...state, detailsSidebarMode: action.state }
    default:
      return state
  }
}
