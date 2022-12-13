import DayCard from "../../../../UI/DayCard/DayCard";
import "./DayReport.css";
import { cloudy } from "../../../../../Store/Imgcontext";
import { useContext, useEffect } from "react";
import userContext from "../../../../../Store/user-context";
const DayReport = () => {
  const [signupLoginObj, setloginData, displayData, isLoading] =
    useContext(userContext);
  if (!isLoading) {
    return (
      <div className="daily-report">
        <img className="daily-report-img" src={displayData.imgURL} />
        <div>
          <DayCard active={"card-active"}>
            <div className="day-report-card">
              <p>Today,2:15 AM </p>
              <h1 className="daily-report-head">
                {`${displayData.temperature}°C`}
              </h1>
              <h3>{displayData.condition}</h3>
              <table className="weatherdata-table">
                <tbody>
                  {displayData.weatherItems.map((e) => {
                    return (
                      <tr key={e.title}>
                        <td className="items-data-icon">
                          <e.iconId.id />
                        </td>
                        <td>{e.title}</td>
                        <td className="items-data-quantity">{`${e.quantity}${e.iconId.symbol}`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </DayCard>
        </div>
      </div>
    );
  }
};
export default DayReport;
