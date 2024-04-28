import { ActionReducerMapBuilder, AnyAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CommonAction, CommonAsyncState } from "./types";

const addCommonAsyncThunksMatchers = <State extends CommonAsyncState>(
    builder: ActionReducerMapBuilder<State>,
    sliceName: string
) => {
    builder
        .addMatcher(
            action => action.type.endsWith('/fulfilled') && action.type.includes(sliceName),
            (state, action: CommonAction) => {
                state.isSuccess = true;
                state.isError = false;
                state.fetched = true;
                state.errorMessage = undefined;

                if (action.payload.showSuccessToast !== false) {
                    toast.success("Operation completed successfully");
                }
            }
        )
        .addMatcher(
            action => action.type.endsWith('/rejected') && action.type.includes(sliceName),
            (state, action: CommonAction) => {
                state.isSuccess = false;
                state.isError = true;
                state.fetched = false;
                state.errorMessage = action.payload.data;
                toast.error(`${action.payload.data}`);
            }
        );
};

export default addCommonAsyncThunksMatchers;