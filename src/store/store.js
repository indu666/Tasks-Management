import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../states/todoSlice";
//Create Redux store
export const store = configureStore({
    reducer: {
        tasks: todoSlice,
    }
});