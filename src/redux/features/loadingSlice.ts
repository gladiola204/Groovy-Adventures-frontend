import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SetLoadingAction {
    payload: boolean,
    type: string,
}

export interface ILoadingState {
    isLoading: boolean,
}

const initialState: ILoadingState = {
    isLoading: false
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        SET_LOADING: (state, action: SetLoadingAction) => {
            state.isLoading = action.payload;
        }
    }
});

export const { SET_LOADING } = loadingSlice.actions;


export const selectIsLoading = (state: RootState) =>  state.loading.isLoading;

export default loadingSlice.reducer;
