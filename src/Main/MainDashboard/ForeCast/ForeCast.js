import LogInButton from "../../UI/LogInButton/LogInButton";
import { mainicon, mobile } from "../../../Store/Imgcontext";
import "./ForeCast.css";
import LeftNav from "./LeftNav/LeftNav";
import DashboardHead from "./DashboardHead/DashboardHead";
import DashboardArea from "./DashboardArea/DashboardArea";
import LogoutModel from "./LogoutModel/LogoutModel";
import CityListModel from "./CityListModel/CityListModel";
import { useState } from "react";

/**
 * This component render all components consisit of
 *  display. after succesfull login.
 * It also consist all logical functionality to
 * user select dashboard or forecast report.
 * provide boolen value of variables to provide
 * active classes or randering of child components
 * like CityListModel and LogoutModel.
 *
 */
const Forecast = () => {
  /**
   *set dayreport of forecastreport in DashboardArea.
   */
  const [isDailyReport, setisDailyReport] = useState(true);

  /**
   *set  logout model state
   */
  const [isLogoutShow, setisLogoutShow] = useState(false);

  /**
   * set  citylist model state
   */
  const [isCityModelShow, setisCityModelShow] = useState(false);

  /**
   *set  leftnav showing state
   */
  const [isLeftNavShow, setisLeftNavShow] = useState(false);

  const reportShowHandler = (data) => {
    setisDailyReport(data);
  };
  const logoutShowHandler = (data) => {
    setisLogoutShow(data);
  };
  const citymodelShowHandler = (data) => {
    setisCityModelShow(data);
  };
  const leftnavShowHandler = (data) => {
    setisLeftNavShow(data);
  };

  return (
    <div className="forecast">
      <LeftNav
        leftnavShow={leftnavShowHandler}
        isleftnavShow={isLeftNavShow}
        reportShowHandler={reportShowHandler}
        active={isDailyReport}
      />
      <div>
        <DashboardHead
          leftnavShow={leftnavShowHandler}
          isleftnavShow={isLeftNavShow}
          logoutShow={logoutShowHandler}
          cityModelShow={citymodelShowHandler}
          cityActive={isCityModelShow}
        />
        <DashboardArea isDailyReport={isDailyReport}></DashboardArea>
      </div>
      {isLogoutShow && <LogoutModel logoutShow={logoutShowHandler} />}
      {isCityModelShow && (
        <CityListModel cityModelShow={citymodelShowHandler} />
      )}
    </div>
  );
};
export default Forecast;
