import "./Main.css";
import Congratulation from "./Congratulation/Congratulation";
import LogIn from "./LogIn/LogIn";
import MainDashboard from "./MainDashboard/MainDashboard";
import SignUp from "./SignUp/SignUp";
import UserContextProvider from "../Store/UserContext";
import { useContext, useEffect } from "react";
import userContext from "../Store/user-context";
import {
  BrowserRouter,
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import DayReport from "./MainDashboard/ForeCast/DashboardArea/DayReport/DayReport";
import ForeCastReport from "./MainDashboard/ForeCast/DashboardArea/ForeCastReport/ForeCastReport";

/**
 * Main component.
 * responsible for display components on base of
 * signup and login state.
 */

const Main = () => {
  const [signupLoginObj, setloginData] = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie.split(";")[0].split("=")[1]) {
      signupLoginObj.dispach({ type: "loginSucceed" });

      const token = document.cookie.split(";")[0].split("=")[1];
      const cityId = document.cookie.split(";")[1].split("=")[1];

      setloginData({
        token: token,
        cityId: cityId,
      });
    }
    signupLoginObj.state.isSignupShow && navigate("/");
    signupLoginObj.state.isSignupSucceed && navigate("/congratulation");
    signupLoginObj.state.isLoginSucceed && navigate("/dashboard/daily-report");
  }, [
    signupLoginObj.state.isLoginSucceed,
    signupLoginObj.state.isSignupSucceed,
    signupLoginObj.state.isSignupShow,
  ]);
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        {signupLoginObj.state.isSignupSucceed && (
          <Route path="congratulation" element={<Congratulation />} />
        )}
        {/* {signupLoginObj.state.isLoginSucceed && (
          <Route path="dashboard" element={<MainDashboard />}>
            <Route path="daily-report" element={<DayReport />} />
            <Route path="forecast-report" element={<ForeCastReport />} />
          </Route>
        )} */}
        <Route path="dashboard" element={<MainDashboard />}>
          <Route path="daily-report" element={<DayReport />} />
          <Route path="forecast-report" element={<ForeCastReport />} />
        </Route>
        <Route
          path="/*"
          element={
            <div>
              <br />
              <h1>Page Not Found</h1>
            </div>
          }
        />
      </Routes>
      {/* {signupLoginObj.state.isSignupShow && <SignUp />} */}
      {/* {signupLoginObj.state.isSignupSucceed && <Congratulation />} */}
      {/* {signupLoginObj.state.isLoginShow && <LogIn />} */}
      {/* {signupLoginObj.state.isLoginSucceed && <MainDashboard />} */}
    </div>
  );
};
export default Main;
