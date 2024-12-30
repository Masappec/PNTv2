import { combineReducers, configureStore } from '@reduxjs/toolkit'
import establishmentSlice from '../Slice/EstablishmentSlice'
import anualreport from '../Slice/AnualReportSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}


const rootReducer = combineReducers({
  establishment: establishmentSlice,
  anualReport: anualreport,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
