import { SET_DETAILS_SIDEBAR } from "../reducers/system.reducer";
import { store } from "../store";

export function setDetailsSidebar(state) {
    const isDetailsOpen = store.getState().systemModule.isDetailsOpen
    console.log(isDetailsOpen, state);
    console.log(isDetailsOpen === state);
    
    
    if (isDetailsOpen === state) return store.dispatch({ type: SET_DETAILS_SIDEBAR, state: '' })
    store.dispatch({ type: SET_DETAILS_SIDEBAR, state })
  }