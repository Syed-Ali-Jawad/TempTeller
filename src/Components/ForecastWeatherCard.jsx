import { useEffect, useState } from "react";
import WeatherDetailCardsDisplay from "./WeatherDetailCardsDisplay";
import { useSelector } from "react-redux";
import { Card } from "antd";

export default function ForecastWeatherCard() {
  const [weatherDataArr, setWeatherDataArr] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState(
    JSON.parse(localStorage.getItem("Weather Forecast")) || null
  );
  const [selectedWeatherForecast, setSelectedWeatherForecast] = useState(
    JSON.parse(localStorage.getItem("Selected City Weather Forecast")) || null
  );
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const [dataLoadStatus, setDataLoadStatus] = useState(
    <p style={{ color: "white" }}>Loading...</p>
  );

  const dateFilterForecast = useSelector((state) => state.dateFilterForecast);
  let selectedCity = useSelector((state) => state.selectedCity);

  useEffect(() => {
    // let weatherData = null;

    let response = null;
    console.log(selectedCity);
    const fetchData = async function () {
      if (!longitude && !latitude) {
        if (selectedCity) {
          const fetchFn = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
          );
          response = await fetchFn.json();
          localStorage.setItem(
            "Selected City Weather Forecast",
            JSON.stringify(response)
          );
          setSelectedWeatherForecast(response);
        }
      } else {
        if (selectedCity) {
          const fetchFn = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
          );
          const response = await fetchFn.json();
          setWeatherForecast(response);
        } else {
          const fetchFn = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=87e1f7cd698953b43ad00223a9eb36c8`
          );
          const response = await fetchFn.json();
          // localStorage.setItem("Weather Forecast", JSON.stringify(response));
          setSelectedWeatherForecast(null);
          setWeatherForecast(response);
        }
      }
    };
    fetchData();
    console.log(selectedWeatherForecast);
    // if (
    //   (weatherForecast && weatherForecast.cod !== ("400" || "404")) ||
    //   (selectedWeatherForecast &&
    //     selectedWeatherForecast.cod !== ("400" || "404"))
    // ) {
    //   if (dateFilterForecast) {
    //     weatherData = (weatherForecast || selectedWeatherForecast).list.filter(
    //       (element) =>
    //         new Date(element.dt_txt).toLocaleDateString("en-UK") ===
    //         dateFilterForecast
    //     );
    //   } else {
    //     weatherData = (weatherForecast || selectedWeatherForecast).list.filter(
    //       (element) =>
    //         new Date(element.dt_txt).toLocaleDateString() ===
    //         new Date().toLocaleDateString()
    //     );
    //   }

    //   setWeatherDataArr(weatherData);
    //   if (latitude && longitude) {
    //     localStorage.setItem(
    //       "Weather Forecast",
    //       JSON.stringify(weatherForecast)
    //     );
    //   }
    // }

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
  }, [longitude, latitude, selectedCity]);

  useEffect(() => {
    let weatherData = null;
    if (
      (weatherForecast && weatherForecast.cod !== ("400" || "404")) ||
      (selectedWeatherForecast &&
        selectedWeatherForecast.cod !== ("400" || "404"))
    ) {
      if (dateFilterForecast) {
        weatherData = (weatherForecast || selectedWeatherForecast).list.filter(
          (element) =>
            new Date(element.dt_txt).toLocaleDateString("en-UK") ===
            dateFilterForecast
        );
      } else {
        weatherData = (weatherForecast || selectedWeatherForecast).list.filter(
          (element) =>
            new Date(element.dt_txt).toLocaleDateString() ===
            new Date().toLocaleDateString()
        );
      }

      setWeatherDataArr(weatherData);
      if (latitude && longitude) {
        localStorage.setItem(
          "Weather Forecast",
          JSON.stringify(weatherForecast)
        );
      }
    }
  }, [dateFilterForecast, weatherForecast, selectedWeatherForecast]);

  return (
    <>
      <Card className="forecast-weather-cards">
        {(weatherForecast && weatherForecast.cod !== ("400" || "404")) ||
        (selectedWeatherForecast &&
          selectedWeatherForecast.cod !== ("400" || "404")) ? (
          <>
            <h1 style={{ margin: "auto" }}>
              {weatherForecast
                ? weatherForecast.city.name
                : selectedWeatherForecast.city.name}
            </h1>

            <h1 style={{ margin: "auto" }}>{dateFilterForecast}</h1>
            <hr style={{ width: "100%" }} />

            {weatherDataArr.map((weatherData) => (
              <WeatherDetailCardsDisplay weatherData={weatherData} />
            ))}
          </>
        ) : (
          <>{dataLoadStatus}</>
        )}
      </Card>
    </>
  );
}
