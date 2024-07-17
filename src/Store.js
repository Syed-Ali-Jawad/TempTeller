import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const reduxSlice = createSlice({
  name: "State Management",
  initialState: {
    selectedCity: null,
    latitude: localStorage.getItem("Latitude") || null,
    longitude: localStorage.getItem("Longitude") || null,
    dateFilterForecast: new Date().toLocaleDateString("en-UK"),
  },
  reducers: {
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
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
  setSelectedCity,
  setLatitude,
  setLongitude,
  setDateFilterForecast,
} = reduxSlice.actions;
export default store;
