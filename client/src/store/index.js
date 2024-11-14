import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from "./slices/phoneSlice";

const store = configureStore({
  reducer: { phones: phonesReducer },
});

export default store;
