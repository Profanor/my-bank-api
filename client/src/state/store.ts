import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserAuthApi } from "@/state/services/auth.service";
import { TransactionApi } from "./services/transaction.service";
import storage from "redux-persist/lib/storage";
import userAuth from "@/state/reducers/auth.reducer";

const persistConfig = {
  key: "newRoot",
  version: 1,
  storage,
  blacklist: [],
};

const reducers = combineReducers({
    userAuth,
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    [TransactionApi.reducerPath] : TransactionApi.reducer,
});

// root reducer with reset logic
const rootReducer = ( state: any, action: any) => {
    if (action.type === "/logout") {
        storage.removeItem('persist:newRoot');
        state = undefined; 
    }
    return reducers(state, action)
}

// create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat([
        UserAuthApi.middleware,
        TransactionApi.middleware
    ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;