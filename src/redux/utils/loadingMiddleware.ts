import { MiddlewareAPI, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { SET_LOADING, loadingSlice } from "../features/loadingSlice";

interface LoadingAction extends AnyAction {
    type: string;
};

const loadingMiddleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => (action: LoadingAction) => {
    // Rozpoczęcie operacji asynchronicznej
    if (action.type.endsWith('/pending')) {
      dispatch(SET_LOADING(true));
    }
  
    // Przekaż akcję dalej w middleware chain
    next(action);
  
    // Zakończenie operacji asynchronicznej
    if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
      dispatch(SET_LOADING(false));
    }
  };
  

export default loadingMiddleware;