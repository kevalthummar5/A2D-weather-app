import TempCard from "../../../../UI/TempCard/TempCard";
import "./ForeCastReport.css";
// import { calander } from "react-icons/fa";
import { cloudy, Calander } from "../../../../../Store/Imgcontext";
import WeatherCard from "../../../../UI/WeatherCard/WeatherCard";
import { useContext } from "react";
import userContext from "../../../../../Store/user-context";

const ForeCastReport = () => {
  const [signupLoginObj, setloginData, displayData, isLoading] =
    useContext(userContext);
  if (!isLoading) {
    return (
      <div className="forecast-report">
        <div className="report-heading">
          <h2>Today</h2>
          <span>sep,12</span>
        </div>
        <div className="day-report">
          {displayData.forecastItems.map((e) => {
            return (
              <WeatherCard
                key={e.day}
                active={e == "day2" ? "card-active" : ""}
              >
                <h4>{e.day}</h4>
                <img className="report-img" src={e.imgURL} />
                <h4>{`${e.quantity}°C`}</h4>
              </WeatherCard>
            );
          })}
        </div>
        <div className="report-heading">
          <h2>Next ForeCast</h2>
          <i className="calander-icon">
            <Calander.id />
          </i>
        </div>
        <div className="next-report">
          {displayData.forecastItems.map((e) => {
            return (
              <TempCard key={e.quantity}>
                <h4>{e.day}</h4>
                <img className="tempcard-img" src={e.imgURL} />
                <h4>{`${e.quantity}°C`}</h4>
              </TempCard>
            );
          })}
        </div>
      </div>
    );
  }
};
export default ForeCastReport;
