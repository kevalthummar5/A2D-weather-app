import LogInButton from "../../../UI/LogInButton/LogInButton";
import { mainicon, mobile } from "../../../../Store/Imgcontext";
import "./LeftNav.css";
import { AiOutlineAppstore, AiOutlineRead } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const LeftNav = (props) => {
  return (
    <nav
      /**
       *css: It is set left: -250px in media query
       *on props is left nav show it bind active
       *class that set left:0
       *
       */
      onClick={() => props.isleftnavShow && props.leftnavShow(false)}
      className={`leftnav ${props.isleftnavShow && "main-nav-active"}`}
    >
      <div className="leftnav-mainicon">
        <img className="leftnav-iconimg" src={mainicon} />
        <h4>Forcasting</h4>
      </div>
      <p className="leftnav-main">Main</p>
      <div className="nav-menu">
        <NavLink
          to="/dashboard/daily-report"
          className={({ isActive }) =>
            `nav-menuitem ${isActive && "nav-active"}`
          }
        >
          <i className="nav-menuicon">
            <AiOutlineAppstore />
          </i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/dashboard/forecast-report"
          className={({ isActive }) =>
            `nav-menuitem ${isActive && "nav-active"}`
          }
        >
          <i className="nav-menuicon">
            <AiOutlineRead />
          </i>
          <span>ForeCast report</span>
        </NavLink>
      </div>
      <div className="leftnav-upgrade">
        <img className="leftnav-mobileimg" src={mobile} />
        <LogInButton title={"Upgrade to Pro"} />
      </div>
    </nav>
  );
};
export default LeftNav;
