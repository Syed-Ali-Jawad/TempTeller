import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WeatherDetailCardsDisplay from "./WeatherDetailCardsDisplay";
import { setLatitude, setLongitude } from "../Store";
import { Card } from "antd";

export default function CurrentWeatherCard() {
  const [weatherData, setWeatherData] = useState(
    JSON.parse(localStorage.getItem("WeatherData"))
  );
  const searchedCity = useSelector((state) => state.searchedCity);
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(setLatitude(position.coords.latitude));
        dispatch(setLongitude(position.coords.longitude));
      },
      () => {
        console.log("Could not retreive data");
      }
    );
    if (longitude && latitude) {
      const fetchedData = async () => {
        if (searchedCity) {
          const fetchFn = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
          );
          const response = await fetchFn.json();
          const weatherData = response;

          setWeatherData(weatherData);
        } else {
          const fetchFn = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
          );
          const response = await fetchFn.json();
          const weatherData = response;
          localStorage.setItem("WeatherData", JSON.stringify(weatherData));
          setWeatherData(weatherData);
        }
        console.log(weatherData);
        console.log(latitude, longitude);
      };

      fetchedData();
      interval = setInterval(() => fetchedData(), 600000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [latitude, longitude, searchedCity]);
  return (
    <Card className="current-weather-card">
      <h1>
        {weatherData && weatherData.cod !== "400"
          ? weatherData.name
          : "No data found"}
      </h1>
      <h1>
        {new Date().toLocaleDateString("en-UK", { weekday: "long" })}{" "}
        {new Date().toLocaleDateString("en-UK")}
      </h1>
      <hr />
      <WeatherDetailCardsDisplay weatherData={weatherData} />
    </Card>
  );
}
