import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Congratulation from "./Main/Congratulation/Congratulation";
import LogIn from "./Main/LogIn/LogIn";
import Main from "./Main/Main";
import DayReport from "./Main/MainDashboard/ForeCast/DashboardArea/DayReport/DayReport";
import ForeCastReport from "./Main/MainDashboard/ForeCast/DashboardArea/ForeCastReport/ForeCastReport";
import MainDashboard from "./Main/MainDashboard/MainDashboard";
import SignUp from "./Main/SignUp/SignUp";
import UserContextProvider from "./Store/UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
