import "./App.css";
import logo from "./assets/logo.svg";
import Filters from "./Components/Filters";
import CurrentWeatherCard from "./Components/CurrentWeatherCard";
import ForecastWeatherCard from "./Components/ForecastWeatherCard";

function App() {
  return (
    <>
      <div className="background"></div>

      <div className="header">
        <span>
          <img style={{ marginLeft: "3px" }} src={logo} />
          <h1>TempTeller</h1>
        </span>
        <Filters />
      </div>
      <div className="page">
        <CurrentWeatherCard />
        <ForecastWeatherCard />
      </div>
    </>
  );
}

export default App;
