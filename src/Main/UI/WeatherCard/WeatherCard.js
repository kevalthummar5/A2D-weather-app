import "./WeatherCard.css";
/**
 * It is Reusable UI component.
 * used in ForecastReport and DayReport.
 */
const WeatherCard = (props) => {
  return <div className={`${props.active} weather-card`}>{props.children}</div>;
};

export default WeatherCard;
