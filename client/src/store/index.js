import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import persistStore from "redux-persist/es/persistStore";


export const store = configureStore({
    reducer: {
        user: rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:false
        })
});

export const persistedStore = persistStore(store);
