import WeatherDetailCard from "./WeatherDetailCard";
import weatherIcon from "../assets/weather-icon.svg";
import thermometerIcon from "../assets/thermometer-icon.svg";
import feelLikeIcon from "../assets/feel-like-icon.svg";
import windSpeedIcon from "../assets/wind-speed-icon.png";
import humidityIcon from "../assets/humidity-icon.svg";

export default function WeatherDetailCardsDisplay({ weatherData }) {
  if (weatherData && weatherData.cod !== "400") {
    return (
      <>
        {weatherData.dt_txt ? (
          <h1>
            {new Date(weatherData.dt_txt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h1>
        ) : null}
        <div
          className={
            weatherData.dt_txt
              ? "forecast-weather-detail-card"
              : "current-weather-detail-card"
          }
        >
          <WeatherDetailCard
            icon={weatherIcon}
            title="Weather"
            measurement={weatherData.weather[0].main}
          />

          <WeatherDetailCard
            icon={thermometerIcon}
            title="Temperature"
            measurement={<>{weatherData.main.temp}&deg;C</>}
          />
          <WeatherDetailCard
            icon={feelLikeIcon}
            title="Feels Like"
            measurement={<>{weatherData.main.feels_like}&deg;C</>}
          />
          <WeatherDetailCard
            icon={windSpeedIcon}
            title="Wind Speed"
            measurement={`${weatherData.wind.speed}km/h`}
          />
          <WeatherDetailCard
            icon={humidityIcon}
            title="Humidity"
            measurement={<>{weatherData.main.humidity}%</>}
          />
        </div>
      </>
    );
  } else {
    return <p style={{ color: "white" }}>No data found</p>;
  }
}
