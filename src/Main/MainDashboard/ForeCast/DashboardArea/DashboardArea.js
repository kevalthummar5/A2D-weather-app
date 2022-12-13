import { Outlet } from "react-router-dom";
import "./DashboardArea.css";
import DayReport from "./DayReport/DayReport";
import ForeCastReport from "./ForeCastReport/ForeCastReport";

const DashboardArea = (props) => {
  return (
    <div className="dashboard-area">
      <Outlet />
      {/* {props.isDailyReport ? <DayReport /> : <ForeCastReport />} */}
    </div>
  );
};
export default DashboardArea;
