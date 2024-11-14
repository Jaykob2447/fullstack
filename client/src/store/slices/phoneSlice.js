import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./../../api";

const PHONES_SLICE_NAME = "phones";

const initialState = { phones: [], isFetching: true, errors: null };

export const getPhonesThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getPhones();
      return data;
    } catch (errors) {
      return thunkAPI.rejectWithValue(errors);
    }
  }
);

export const createPhoneThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/post`,
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.createPhone(payload);
      return data;
    } catch (errors) {
      return thunkAPI.rejectWithValue(errors);
    }
  }
);

const phonesSlice = createSlice({
  name: PHONES_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    // post phone
    builder.addCase(createPhoneThunk.pending, (state, actions) => {
      state.isFetching = true;
      state.errors = null;
    });
    builder.addCase(createPhoneThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.phones.push(payload);
    });
    builder.addCase(createPhoneThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.phones = payload;
    });
    // get phones
    builder.addCase(getPhonesThunk.pending, (state, actions) => {
      state.isFetching = true;
      state.errors = null;
    });
    builder.addCase(getPhonesThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.phones = [...payload];
    });
    builder.addCase(getPhonesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.phones = payload;
    });
  },
});
const { reducer, actions } = phonesSlice;

export default reducer;
