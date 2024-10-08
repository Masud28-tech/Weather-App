import { createContext } from "react";

const initialAppState = {
  weather: null,
  forecast: null,
  unit: "C",
  city: "Nagpur",
  country: "IN",
  isDark: true,
  geoCoords: {
    lon: 77.2167,
    lat: 28.6667,
  },
};

function appReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "WEATHER":
      return { ...state, weather: payload };
    case "FORECAST":
      return { ...state, forecast: payload };
    case "CITY":
      return { ...state, city: payload };
    case "COUNTRY":
      return { ...state, country: payload };
    case "UNIT":
      return { ...state, unit: payload };
    case "GEO_COORDS":
      return { ...state, geoCoords: payload };
    case "DARK":
      return { ...state, isDark: payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export { appReducer, initialAppState };
export default AppContext;
