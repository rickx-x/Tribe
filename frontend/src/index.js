import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import { configureStore } from "@reduxjs/toolkit";
import { Provider }from "react-redux";

/* session storage or cache memory data */ 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// import persistReducer from 'redux-persist/es/persistReducer';


const persistConfig = {key:"root", storage,version :1};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer : persistedReducer,
  middleware: (getDefaultMiddleWare) => 
  getDefaultMiddleWare({
    serializableCheck:{
      ignoredActions:[FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE]
    },
  }),
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading= {null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
