import "./TempCard.css";
/**
 * It is Reusable UI component.
 * used in ForecastReport.
 */
const TempCard = (props) => {
  return <div className="temp-card">{props.children}</div>;
};

export default TempCard;
