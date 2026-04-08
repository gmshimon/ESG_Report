import { combineReducers, configureStore } from "@reduxjs/toolkit";
import emissionsReducer from "./Feature/Emission/emission.slice";
import authReducer from "./Feature/Auth/auth.slice";

const rootReducer = combineReducers({
  emissions: emissionsReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
