// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// slice 불러오기
import userSlice from "../modules/userSlice";

// rootReducer에 묶기
const rootReducer = combineReducers({
  user: userSlice,
});

// store 생성
export const store = configureStore({
  reducer: rootReducer,
});

export default store;
