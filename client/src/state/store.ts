import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserAuthApi } from "@/state/services/auth.service";
// import userAuth from "@/state/reducers/auth.reducer";

const reducers = combineReducers({
    // userAuth,
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware),
});

setupListeners(store.dispatch);

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;