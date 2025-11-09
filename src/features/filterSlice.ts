import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchValue: string;
}

const initialState: FilterState = {
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    resetSearch(state) {
      state.searchValue = "";
    },
  },
});

export const { setSearchValue, resetSearch } = filterSlice.actions;
export default filterSlice.reducer;
