import LogInButton from "../../../UI/LogInButton/LogInButton";
import { mainicon, mobile } from "../../../../Store/Imgcontext";
import "./LeftNav.css";
import { AiOutlineAppstore, AiOutlineRead } from "react-icons/ai";

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
      <p>Main</p>
      <div className="nav-menu">
        <div
          onClick={() => props.reportShowHandler(true)}
          className={`nav-menuitem ${props.active && "nav-active"}`}
        >
          <i className="nav-menuicon">
            <AiOutlineAppstore />
          </i>
          <span>Dashboard</span>
        </div>
        <div
          onClick={() => props.reportShowHandler(false)}
          className={`nav-menuitem ${!props.active && "nav-active"}`}
        >
          <i className="nav-menuicon">
            <AiOutlineRead />
          </i>
          <span>ForeCast report</span>
        </div>
      </div>
      <div className="leftnav-upgrade">
        <img className="leftnav-mobileimg" src={mobile} />
        <LogInButton title={"Upgrade to Pro"} />
      </div>
    </nav>
  );
};
export default LeftNav;
