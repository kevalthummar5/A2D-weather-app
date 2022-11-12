import "./Main.css";
import Congratulation from "./Congratulation/Congratulation";
import LogIn from "./LogIn/LogIn";
import MainDashboard from "./MainDashboard/MainDashboard";
import SignUp from "./SignUp/SignUp";
import UserContextProvider from "../Store/UserContext";
import { useContext } from "react";
import userContext from "../Store/user-context";

/**
 * Main component.
 * responsible for display components on base of
 * signup and login state.
 */

const Main = () => {
  const [signupLoginObj] = useContext(userContext);

  return (
    <div className="main">
      {signupLoginObj.state.isSignupShow && <SignUp />}
      {signupLoginObj.state.isSignupSucceed && <Congratulation />}
      {signupLoginObj.state.isLoginShow && <LogIn />}
      {signupLoginObj.state.isLoginSucceed && <MainDashboard />}
    </div>
  );
};
export default Main;
