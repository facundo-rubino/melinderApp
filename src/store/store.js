import { configureStore } from "@reduxjs/toolkit";
import searchesReducer from "../features/searchesSlice";

export const store = configureStore({
    reducer: {
        objSearches: searchesReducer,
    }
})