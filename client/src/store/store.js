import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './slice/user/userSlice';
import messageReducer from './slice/message/messageSlice'
import socketReducer from './socket/socketSlice'


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['socket'],
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket : socketReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['socket'],
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      }
    }),
});

export const persistor = persistStore(store);


