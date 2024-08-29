import { SET_DETAILS_SIDEBAR } from "../reducers/system.reducer";
import { store } from "../store";

export function setDetailsSidebar(state) {
    const detailsSidebarMode = store.getState().systemModule.detailsSidebarMode
    
    
    if (detailsSidebarMode === state) return store.dispatch({ type: SET_DETAILS_SIDEBAR, state: '' })
    store.dispatch({ type: SET_DETAILS_SIDEBAR, state })
  }