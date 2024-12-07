import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../providers/todoReducer/todoSlice.js";

const store = configureStore({
    reducer : {
        data : todoReducer,
    }
});

export default store;