import { createSlice } from "@reduxjs/toolkit";

export interface SearchStateInterface {
  query: string;
  isSearching: boolean;
}

const initialSearchState: SearchStateInterface = {
  query: "",
  isSearching: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setQuery(state, action: { payload: string }) {
      state.query = action.payload;
    },
    setIsSearching(state, action: { payload: boolean }) {
      state.isSearching = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
