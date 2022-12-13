import BackDrop from "../../../UI/BackDrop/BackDrop";
import "./LogoutModel.css";
import { FaPowerOff } from "react-icons/fa";
import userContext from "../../../../Store/user-context";
import { useContext } from "react";

/**
 * This component render logout screen utilize usercontext .
 * and also set cookie to null.
 */

const LogoutModel = (props) => {
  const [signupLoginObj] = useContext(userContext);

  return (
    <div>
      <BackDrop onClick={() => props.logoutShow(false)} />
      <div className="logout-model">
        <i className="logout-icon">
          <FaPowerOff />
        </i>
        <h2 className="logout-model-head">Log Out</h2>
        <p className="logout-model-line">
          Are you sure you want to logout from app?
        </p>
        <div className="logout-btns">
          <button
            className="logout-button"
            onClick={() => {
              /**
               * set cookie to empty
               */

              document.cookie = "token=";
              document.cookie = "cityId=";
              signupLoginObj.dispach({ type: "signupShow" });
            }}
          >
            Log out
          </button>
          <button
            className="logout-cancel"
            onClick={() => props.logoutShow(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogoutModel;
