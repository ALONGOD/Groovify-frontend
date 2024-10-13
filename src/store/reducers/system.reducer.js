export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOGGLE_DETAILS_SIDEBAR = 'TOGGLE_DETAILS_SIDEBAR'
export const SET_DETAILS_SIDEBAR = 'SET_DETAILS_SIDEBAR'
export const SET_IS_MOBILE = 'SET_IS_MOBILE'

export const SET_DRAG_ACTIVE_START = 'SET_DRAG_ACTIVE_START'
export const SET_DRAG_ACTIVE_DONE = 'SET_DRAG_ACTIVE_DONE'

const initialState = {
  isLoading: false,
  detailsSidebarMode: false, /*queueDetails or songDetails or empty */
  isMobile: false,
  isDragActive: false
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
    case SET_IS_MOBILE:
      return { ...state, isMobile: action.isMobile }
      
    case SET_DRAG_ACTIVE_START:
      return {...state, isDragActive: true}
    case SET_DRAG_ACTIVE_DONE:
      return {...state, isDragActive: false}
    default:
      return state
  }
}
