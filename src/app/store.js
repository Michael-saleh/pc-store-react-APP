// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";
import noteReducer from "./features/noteSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        note: noteReducer
    },
});
