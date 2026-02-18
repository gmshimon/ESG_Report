import { combineReducers, configureStore } from "@reduxjs/toolkit";
import emissionsReducer from "./emissionsSlice";

const rootReducer = combineReducers({
  emissions: emissionsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
