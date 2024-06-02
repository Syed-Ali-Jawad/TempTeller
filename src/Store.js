import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const reduxSlice = createSlice({
  name: "State Management",
  initialState: {
    searchedCity: null,
    latitude: null,
    longitude: null,
    dateFilterForecast: new Date().toLocaleDateString("en-UK"),
  },
  reducers: {
    setSearchedCity(state, action) {
      state.searchedCity = action.payload;
    },
    setLatitude(state, action) {
      state.latitude = action.payload;
    },
    setLongitude(state, action) {
      state.longitude = action.payload;
    },
    setDateFilterForecast(state, action) {
      state.dateFilterForecast = action.payload;
    },
  },
});
const store = configureStore({ reducer: reduxSlice.reducer });

export const {
  setSearchedCity,
  setLatitude,
  setLongitude,
  setDateFilterForecast,
} = reduxSlice.actions;
export default store;
