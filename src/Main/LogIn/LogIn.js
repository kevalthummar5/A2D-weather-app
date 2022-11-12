import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useContext, useReducer, useState } from "react";
import {
  errorSetter,
  emailChecker,
  passwordChecker,
} from "../../Helpers/HelpersFunctions";
import LogInButton from "../UI/LogInButton/LogInButton";
import LogInCard from "../UI/LogInCard/LogInCard";
import "./LogIn.css";
import userContext from "../../Store/user-context";
import { postData } from "../../Helpers/userFunctions";

/**
 * This component render login screen and responsible for
 * display validation (error msg). and also display fetch
 * error. it also having form state to manage input
 * and error message.utilize errorsetter function and
 * checker functions at helpersfunctions.
 * send data to server if form is valid
 */
const LogIn = () => {
  let isFormValid = false;

  /**
   * This is used to show or hide password.
   */
  const [isPasswordShow, setisPasswordShow] = useState(false);
  /**
   * utilize usercontext send login succeed to main usercontext
   * after succesful login.
   */
  const [signupLoginObj, setloginData] = useContext(userContext);

  /**
   * This is display fetched error message.
   */
  const [loginFetchError, setloginFetchError] = useState("");

  /**
   * This is reducer function for form state.
   */
  const loginFormreducer = (loginFormstate, action) => {
    switch (action.type) {
      case "emailError":
        return errorSetter(
          emailChecker(action.input, action.type),
          loginFormstate
        );
      case "passwordError":
        return errorSetter(
          passwordChecker(action.input, action.type),
          loginFormstate
        );
      case "submit":
        let submitErrorObj = {};
        submitErrorObj["emailError"] = !loginFormstate[1].isEmailValid
          ? "enter your email"
          : "";
        submitErrorObj["passwordError"] = !loginFormstate[1].isPasswordValid
          ? "enter your password"
          : "";

        return [submitErrorObj, loginFormstate[1], loginFormstate[2]];
      default:
        return;
    }
  };

  /**
   * This is reducer hook for form state.
   */
  const [loginFormstate, loginFormDispatch] = useReducer(loginFormreducer, [
    {
      emailError: "",
      passwordError: "",
    },
    {
      isEmailValid: false,
      isPasswordValid: false,
    },
    {
      email: "",
      password: "",
    },
  ]);
  isFormValid = Object.values(loginFormstate[1]).every((e) => e === true);

  /**
   * This is main submithandler.
   * it checks for form validity from form state
   * and if valid submit data to server by
   * utilizing userfunctions .
   */
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    loginFormDispatch({ type: "submit" });
    let loginStatus =
      isFormValid && (await postData("login", loginFormstate[2]));

    if (await loginStatus.succeed) {
      /**
       * set cookie to browser
       */
      document.cookie = `token=${loginStatus.data.token}`;
      document.cookie = `cityId=${loginStatus.data.liveWeather.cityId}`;

      /**
       * set login succeed to main context
       */
      await signupLoginObj.dispach({ type: "loginSucceed" });

      setloginData({
        token: loginStatus.data.token,
        cityId: loginStatus.data.liveWeather.cityId,
      });
    } else {
      /**
       * set fetch error message.
       */
      setloginFetchError(await loginStatus.data.msg);
    }
  };

  return (
    <LogInCard description={"Enter Your Email and Password"}>
      <span className="login-fetcherror">{loginFetchError}</span>

      <form onSubmit={loginSubmitHandler} className="login-form">
        <input
          placeholder="Email"
          className="login-input"
          type="text"
          onChange={(e) => {
            loginFormDispatch({
              type: "emailError",
              input: e.target.value,
            });
          }}
        />
        <span className="login-error">{loginFormstate[0].emailError}</span>
        <div className="login-password">
          <i
            onClick={() => setisPasswordShow(!isPasswordShow)}
            className="login-password-icon"
          >
            {isPasswordShow ? <FaRegEyeSlash /> : <FaRegEye />}
          </i>
          <input
            placeholder="Password"
            className="login-input"
            type={isPasswordShow ? "text" : "password"}
            onChange={(e) => {
              loginFormDispatch({
                type: "passwordError",
                input: e.target.value,
              });
            }}
          />
        </div>
        <span className="login-error">{loginFormstate[0].passwordError}</span>

        <LogInButton
          invalid={!isFormValid && "invalid"}
          type={"submit"}
          title={"Log In"}
        ></LogInButton>
      </form>
      <p className="login-bottemline">
        Don't have an Account? &nbsp;
        <span
          className="login-bottemline-span"
          onClick={() => {
            signupLoginObj.dispach({ type: "signupShow" });
          }}
        >
          Sign Up
        </span>
      </p>
    </LogInCard>
  );
};
export default LogIn;
