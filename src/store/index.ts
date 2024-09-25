import { configuredApi } from "@constants/createApi-common";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { authApi } from '@services/auth.service';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const configureStoreWithMiddleWare = (initialState: {}) => {
  const rootReducer = combineReducers({
    [configuredApi.reducerPath]: configuredApi.reducer,

    // Add your reducers here
  });
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([configuredApi.middleware]),
    preloadedState: initialState,
    devTools: import.meta.env.DEV,
  });
  return { store };
};

export const { store } = configureStoreWithMiddleWare({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
