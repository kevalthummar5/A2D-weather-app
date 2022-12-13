import TempCard from "../../../../UI/TempCard/TempCard";
import "./ForeCastReport.css";
// import { calander } from "react-icons/fa";
import { cloudy, Calander } from "../../../../../Store/Imgcontext";
import WeatherCard from "../../../../UI/WeatherCard/WeatherCard";
import { useContext, useEffect } from "react";
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
          {displayData.timeWiseItems.map((e) => {
            return (
              <WeatherCard key={e.id}>
                <p>{`${e.temperature}°C`}</p>
                <img className="report-img" src={e.imgURL} />
                <p>{e.time}</p>
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
              <TempCard key={e.id}>
                <p>{e.day}</p>
                <img className="tempcard-img" src={e.imgURL} />
                <p>{`${e.temperature}°C`}</p>
              </TempCard>
            );
          })}
        </div>
      </div>
    );
  }
};
export default ForeCastReport;
