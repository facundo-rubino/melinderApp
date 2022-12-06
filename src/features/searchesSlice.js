import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searches: [],
    searchId: 0,
}

export const searchesSlice = createSlice({
    name: "searches",
    initialState,
    reducers: {
        saveId: (state, action) => {
            state.searchId = action.payload;
        },
        saveFav: (state, action) => {
            let findSearch = state.searches.find(s => s.id === Number(action.payload.idSearch));
            findSearch.favs.push(action.payload.car);

            let itemDropIndex = findSearch.result.findIndex(s => s.id === action.payload.car.id);
            findSearch.result.splice(itemDropIndex, 1);
        },
        dropFav: (state, action) => {
            let findSearch = state.searches.find(s => s.id === Number(action.payload.idSearch));
            findSearch.result.push(action.payload.car);

            let itemDropIndex = findSearch.favs.findIndex(s => s.id === action.payload.car.id);
            findSearch.favs.splice(itemDropIndex, 1);
        },
        discardItem: (state, action) => {
            let findSearch = state.searches.find(s => s.id === Number(action.payload.idSearch));
            findSearch.discarded.push(action.payload.car);

            let itemDropIndex = findSearch.result.findIndex(s => s.id === action.payload.car.id);
            findSearch.result.splice(itemDropIndex, 1);
        },
        deleteSearch: (state, action) => {
            state.searches.splice(action.payload, 1);
            if (state.searches.length === 0) {
                state.searchId = 0;
            }
        },
        deleteAllSearches: (state) => {
            state.searches = []

        },
        saveSearch: (state, action) => {
            state.searchId++;
            state.searches = action.payload;
        },

    }

})

export const { saveFav, saveId, discardItem, deleteSearch, deleteAllSearches, saveSearch, dropFav } = searchesSlice.actions;
export default searchesSlice.reducer;