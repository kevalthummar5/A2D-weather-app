import "./DayCard.css";
/**
 * It is Reusable UI component.
 * used in ForecastReport and DayReport.
 */
const DayCard = (props) => {
  return <div className="day-card">{props.children}</div>;
};

export default DayCard;
