import { createAsyncThunk } from "@reduxjs/toolkit";
import parseAxiosError from "./parseAxiosError";

function createCustomAsyncThunk<T, A>(typePrefix: string, requestFunction: (args: A) => Promise<T>, args: A) { return createAsyncThunk(
    typePrefix,
    async (_, thunkAPI) => {
        try {
            return await requestFunction(args);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    })
}

export default createCustomAsyncThunk;