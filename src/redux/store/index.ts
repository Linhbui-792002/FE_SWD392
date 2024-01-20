import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from '../api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { loginApi } from '../endPoint/login';
import { accountApi } from '../endPoint/accounts';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['data'],
};

const makeStore = () => {
    const reducers = combineReducers({
        [api.reducerPath]: api.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,

    });

    const persistedReducer = persistReducer(persistConfig, reducers);

    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat([
                loginApi.middleware,
                accountApi.middleware
            ]),
    });

    setupListeners(store.dispatch);

    return store;
};

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
