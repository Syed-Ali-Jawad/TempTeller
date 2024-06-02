import { useEffect, useState } from "react";
import WeatherDetailCardsDisplay from "./WeatherDetailCardsDisplay";
import { useSelector } from "react-redux";
import { Card } from "antd";

export default function ForecastWeatherCard() {
  const [weatherDataArr, setWeatherDataArr] = useState([]);
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);

  const dateFilterForecast = useSelector((state) => state.dateFilterForecast);
  const searchedCity = useSelector((state) => state.searchedCity);

  useEffect(() => {
    const fetchData = async function () {
      let weatherData = null;
      let fetchFn = null;
      if (searchedCity) {
        fetchFn = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
        );
      } else {
        fetchFn = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
        );
      }
      const response = await fetchFn.json();
      console.log(response);
      if (response.cod !== "400") {
        if (dateFilterForecast) {
          weatherData = response.list.filter(
            (element) =>
              new Date(element.dt_txt).toLocaleDateString("en-UK") ===
              dateFilterForecast
          );
        } else {
          weatherData = response.list.filter(
            (element) =>
              new Date(element.dt_txt).toLocaleDateString() ===
              new Date().toLocaleDateString()
          );
        }

        setWeatherDataArr(weatherData);
      }
    };
    fetchData();
    let interval = setInterval(() => fetchData(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [longitude, latitude, dateFilterForecast, searchedCity]);

  return (
    <>
      <Card className="forecast-weather-cards">
        {weatherDataArr.length > 0 ? (
          <>
            <h1 style={{ margin: "auto" }}>{dateFilterForecast}</h1>
            <hr style={{ width: "100%" }} />
            {weatherDataArr.map((weatherData) => (
              <WeatherDetailCardsDisplay weatherData={weatherData} />
            ))}
          </>
        ) : (
          <p style={{ color: "white" }}>Could not fetch data</p>
        )}
      </Card>
    </>
  );
}
