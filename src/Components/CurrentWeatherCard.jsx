import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WeatherDetailCardsDisplay from "./WeatherDetailCardsDisplay";
import { setLatitude, setLongitude } from "../Store";
import { Card } from "antd";

export default function CurrentWeatherCard() {
  const [weatherData, setWeatherData] = useState(
    JSON.parse(localStorage.getItem("WeatherData")) || null
  );
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const selectedCity = useSelector((state) => state.selectedCity);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let fetchFn = null;
      if (selectedCity) {
        fetchFn = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
        );
      } else if (latitude && longitude) {
        fetchFn = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
        );
      } else {
        return;
      }

      const response = await fetchFn.json();
      const weatherData = response;
      if (weatherData.cod !== ("400" || "404")) {
        setWeatherData(weatherData);
        localStorage.setItem("WeatherData", JSON.stringify(weatherData));
      } else {
        setWeatherData(null);
      }
    };
    if (!latitude || !longitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setLatitude(position.coords.latitude));
          dispatch(setLongitude(position.coords.longitude));
          localStorage.setItem("Latitude", position.coords.latitude);
          localStorage.setItem("Longitude", position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }

    fetchData();
    const interval = setInterval(fetchData, 600000);

    return () => {
      clearInterval(interval);
    };
  }, [latitude, longitude, selectedCity]);
  return (
    <Card className="current-weather-card">
      {!selectedCity && !weatherData && !latitude && !longitude ? (
        <p style={{ color: "white" }}>
          Select a city or provide location access
        </p>
      ) : weatherData && weatherData.cod !== ("400" || "404") ? (
        <>
          <h1>{weatherData.name}</h1>
          <h1>
            {new Date().toLocaleDateString("en-UK", { weekday: "long" })}{" "}
            {new Date().toLocaleDateString("en-UK")}
          </h1>
          <hr />
          <WeatherDetailCardsDisplay weatherData={weatherData} />
        </>
      ) : (
        <p style={{ color: "white" }}>No Data Found</p>
      )}
    </Card>
  );
}
