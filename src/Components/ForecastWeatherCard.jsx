import { useEffect, useState } from "react";
import WeatherDetailCardsDisplay from "./WeatherDetailCardsDisplay";
import { useSelector } from "react-redux";
import { Card } from "antd";

export default function ForecastWeatherCard() {
  const [weatherDataArr, setWeatherDataArr] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState(
    JSON.parse(localStorage.getItem("Weather Forecast")) || null
  );
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const [dataLoadStatus, setDataLoadStatus] = useState(
    <p style={{ color: "white" }}>Loading...</p>
  );

  const dateFilterForecast = useSelector((state) => state.dateFilterForecast);
  const searchedCity = useSelector((state) => state.searchedCity);

  useEffect(() => {
    let weatherData = null;
    const fetchData = async function () {
      let fetchFn = null;
      if (weatherForecast) {
      } else {
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
        localStorage.setItem("Weather Forecast", JSON.stringify(response));
        setWeatherForecast(response);
      }
    };
    if (weatherForecast.cod !== ("400" || "404")) {
      if (dateFilterForecast) {
        weatherData = weatherForecast.list.filter(
          (element) =>
            new Date(element.dt_txt).toLocaleDateString("en-UK") ===
            dateFilterForecast
        );
      } else {
        weatherData = weatherForecast.list.filter(
          (element) =>
            new Date(element.dt_txt).toLocaleDateString() ===
            new Date().toLocaleDateString()
        );
      }

      setWeatherDataArr(weatherData);
    }
    fetchData();
    setTimeout(
      () =>
        setDataLoadStatus(
          <p style={{ color: "white" }}>
            Could not load data.
            <br /> Either select a city or provide location access.{" "}
          </p>
        ),
      3000
    );
    let interval = setInterval(() => fetchData(), 600000);
    return () => {
      clearInterval(interval);
    };
  }, [longitude, latitude, dateFilterForecast, searchedCity, weatherForecast]);

  return (
    <>
      <Card className="forecast-weather-cards">
        {searchedCity || (latitude && longitude) ? (
          weatherDataArr.length > 0 ? (
            <>
              {searchedCity ? (
                <h1 style={{ margin: "auto" }}>{searchedCity}</h1>
              ) : null}
              <h1 style={{ margin: "auto" }}>{dateFilterForecast}</h1>
              <hr style={{ width: "100%" }} />

              {weatherDataArr.map((weatherData) => (
                <WeatherDetailCardsDisplay weatherData={weatherData} />
              ))}
            </>
          ) : (
            <>{dataLoadStatus}</>
          )
        ) : (
          dataLoadStatus
        )}
      </Card>
    </>
  );
}
