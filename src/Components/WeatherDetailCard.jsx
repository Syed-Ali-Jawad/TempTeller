export default function WeatherDetailCard({ icon, title, measurement }) {
  return (
    <div className="weather-details-card">
      <img style={{}} src={icon} />
      <span>
        <h3>{title}</h3>
        <p>{measurement}</p>
      </span>
    </div>
  );
}
