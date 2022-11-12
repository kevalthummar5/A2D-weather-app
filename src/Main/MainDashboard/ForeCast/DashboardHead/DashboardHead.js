import "./DashboardHead.css";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
  FaPowerOff,
  FaMapMarkerAlt,
} from "react-icons/fa";

const DashboardHead = (props) => {
  return (
    <header className={`dashboard-head ${props.cityActive && "head-active"}`}>
      <i
        className="head-menuitem"
        onClick={() => props.leftnavShow(!props.isleftnavShow)}
      >
        {props.isleftnavShow ? <FaTimes /> : <FaBars />}
      </i>
      <div
        className={`head-selectcity ${props.cityActive && "city-active"}`}
        onClick={() => props.cityModelShow(true)}
      >
        <i>
          <FaMapMarkerAlt />
        </i>
        <span className="head-cityname">Semarang</span>
        <i>
          <FaChevronDown />
        </i>
      </div>
      <i
        className={`head-logout ${props.cityActive && "logout-active"}`}
        onClick={() => props.logoutShow(true)}
      >
        <FaPowerOff />
      </i>
    </header>
  );
};
export default DashboardHead;
