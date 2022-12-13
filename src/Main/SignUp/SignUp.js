import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import {
  errorSetter,
  phoneChecker,
  emailChecker,
  passwordChecker,
  countryChecker,
  nameChecker,
} from "../../Helpers/HelpersFunctions";
import userContext from "../../Store/user-context";
import LogInButton from "../UI/LogInButton/LogInButton";
import LogInCard from "../UI/LogInCard/LogInCard";
import "./SignUp.css";
import { postData } from "../../Helpers/userFunctions";
import { Link, Navigate, useNavigate } from "react-router-dom";
/**
 * This component render signup screen and responsible for
 * display validation (error msg). and also display fetch
 * error. it also having form state to manage input
 * and error message.it utilize errorsetter function and
 * checker functions at helpersfunctions.
 * send data to server if form is valid
 */
const SignUp = () => {
  /**
   * utilize usercontext and send signup succeed to main usercontext
   * after succesful login.
   */
  const [signupLoginObj, setloginData] = useContext(userContext);
  const navigate = useNavigate();
  /**
   * This is display fetched error message.
   */
  const [signupFetchError, setsignupFetchError] = useState("");

  /**
   * This is used to show or hide password.
   */
  const [isPasswordShow, setisPasswordShow] = useState(false);

  /**
   * check for cookie. if present than set
   * explicity login to succeed to main user
   * context and call for login data to display.
   */

  let isFormValid = false;

  /**
   * This is reducer function for form state.
   */
  const signupFormreducer = (signupFormstate, action) => {
    switch (action.type) {
      case "nameError":
        return errorSetter(
          nameChecker(action.input, action.type),
          signupFormstate
        );
      case "phoneError":
        return errorSetter(
          phoneChecker(action.input, action.type),
          signupFormstate
        );
      case "countryError":
        return errorSetter(
          countryChecker(action.input, action.type),
          signupFormstate
        );
      case "emailError":
        return errorSetter(
          emailChecker(action.input, action.type),
          signupFormstate
        );
      case "passwordError":
        return errorSetter(
          passwordChecker(action.input, action.type),
          signupFormstate
        );
      case "submit":
        let submitErrorObj = {};
        submitErrorObj["nameError"] = !signupFormstate[1].isNameValid
          ? "enter your name"
          : "";
        submitErrorObj["phoneError"] = !signupFormstate[1].isPhoneValid
          ? "enter your phone number"
          : "";
        submitErrorObj["countryError"] = !signupFormstate[1].isCountryValid
          ? "please select country"
          : "";
        submitErrorObj["emailError"] = !signupFormstate[1].isEmailValid
          ? "enter your email"
          : "";
        submitErrorObj["passwordError"] = !signupFormstate[1].isPasswordValid
          ? "enter your password"
          : "";

        return [submitErrorObj, signupFormstate[1], signupFormstate[2]];
      default:
        return;
    }
  };

  /**
   * This is reducer hook for form state.
   */
  const [signupFormstate, signupFormDispatch] = useReducer(signupFormreducer, [
    {
      nameError: "",
      phoneError: "",
      countryError: "",
      emailError: "",
      passwordError: "",
    },
    {
      isNameValid: false,
      isPhoneValid: false,
      isCountryValid: false,
      isEmailValid: false,
      isPasswordValid: false,
    },
    {
      name: "",
      phone: "",
      country: "",
      email: "",
      password: "",
    },
  ]);

  /**
   * This is check for form validity.
   */
  isFormValid = Object.values(signupFormstate[1]).every((e) => e === true);

  /**
   * This is main submithandler.
   * it checks for form validity from form state
   * and if valid submit data to server by
   * utilizing userfunctions .
   */
  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    signupFormDispatch({ type: "submit" });

    let signupStatus =
      isFormValid && (await postData("create-user", signupFormstate[2]));

    /**
     * set signup succeed to main context
     */
    {
      (await signupStatus.succeed)
        ? await signupLoginObj.dispach({ type: "signupSucceed" })
        : setsignupFetchError(await signupStatus.data.message);
    }
  };

  return (
    <LogInCard description={"Enter Your Details"}>
      <span className="signup-fetcherror">{signupFetchError}</span>
      <form onSubmit={signupSubmitHandler} className="signup-form">
        <input
          placeholder="Full Name"
          className="signup-input"
          type="text"
          onChange={(e) => {
            signupFormDispatch({
              type: "nameError",
              input: e.target.value,
            });
          }}
        />
        <span className="signup-error">{signupFormstate[0].nameError}</span>
        <input
          placeholder="Phone Number"
          className="signup-input"
          type="text"
          onChange={(e) => {
            signupFormDispatch({
              type: "phoneError",
              input: e.target.value,
            });
          }}
        />
        <span className="signup-error">{signupFormstate[0].phoneError}</span>
        <select
          onChange={(e) => {
            signupFormDispatch({
              type: "countryError",
              input: e.target.value,
            });
          }}
          className="signup-input"
          defaultValue="country"
        >
          <option value="country">Country</option>
          <option value="India">India</option>
          <option value="United states">United states</option>{" "}
          <option value="Nepal">Nepal</option>
          <option value="Maldives">Maldives</option>
          <option value="Madagascar">Madagascar</option>
        </select>
        <span className="signup-error">{signupFormstate[0].countryError}</span>
        <input
          placeholder="Email"
          className="signup-input"
          type="text"
          onChange={(e) => {
            signupFormDispatch({
              type: "emailError",
              input: e.target.value,
            });
          }}
        />
        <span className="signup-error">{signupFormstate[0].emailError}</span>
        <div className="signup-password">
          <i
            onClick={() => setisPasswordShow(!isPasswordShow)}
            className="signup-password-icon"
          >
            {isPasswordShow ? <FaRegEyeSlash /> : <FaRegEye />}
          </i>
          <input
            placeholder="Password"
            className="signup-input"
            type={isPasswordShow ? "text" : "password"}
            onChange={(e) => {
              signupFormDispatch({
                type: "passwordError",
                input: e.target.value,
              });
            }}
          />
        </div>
        <span className="password-error signup-error">
          {signupFormstate[0].passwordError}
        </span>

        <LogInButton
          invalid={!isFormValid && "invalid"}
          type={"submit"}
          title={"Sign Up"}
        ></LogInButton>
      </form>
      <p className="signup-bottomform-line">
        By registering you agree to the Forcasting.
        <a href="" className="signup-line-span">
          Terms of Use
        </a>
        &nbsp; and &nbsp;
        <a href="" className="signup-line-span">
          Privacy Policy.
        </a>
      </p>
      <p className="signup-bottemline">
        Already have an Account?&nbsp;
        <span
          className="signup-bottemline-span"
          onClick={() => {
            signupLoginObj.dispach({ type: "loginShow" });
          }}
        >
          <Link to="/login">Log in</Link>
        </span>
      </p>
    </LogInCard>
  );
};
export default SignUp;
