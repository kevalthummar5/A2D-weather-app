import { useReducer, useState, useEffect, Component } from "react";
import userContext from "./user-context";
import { displayFn } from "../Helpers/weatherFunctions";

/**
 * This component is contextprovider consist of
 * signup login states and displaydata.
 *  this is responsible for main output display among
 * (LogIn,SignUp,Congratulation,Main dashboard)
 * and aslo provide display data after log in.
 * @param   {props} param1 children (all components).
 * @return  {Component}  providercomponent to all
 * components of apps.
 */
const UserContextProvider = (props) => {
  /**
   * This get login data.
   */
  const [loginData, setloginData] = useState({});

  /**
   * This get display data, provided at usercontext.
   */
  const [displayData, setdisplayData] = useState({});

  const [isLoading, setisLoading] = useState(true);

  /**
   * this is reducer for sign up and login state.
   */
  const signupLoginreducer = (state, action) => {
    switch (action.type) {
      case "signupShow":
        return {
          isSignupShow: true,
          isSignupSucceed: false,
          isLoginShow: false,
          isLoginSucceed: false,
        };
      case "signupSucceed":
        return {
          isSignupShow: false,
          isSignupSucceed: true,
          isLoginShow: false,
          isLoginSucceed: false,
        };
      case "loginShow":
        return {
          isSignupShow: false,
          isSignupSucceed: false,
          isLoginShow: true,
          isLoginSucceed: false,
        };
      case "loginSucceed":
        return {
          isSignupShow: false,
          isSignupSucceed: false,
          isLoginShow: false,
          isLoginSucceed: true,
        };
      default:
        return;
    }
  };

  /**
   * this is reducer hook for sign up and login state.
   */
  const [signupLoginstate, signupLoginDispatch] = useReducer(
    signupLoginreducer,
    {
      isSignupShow: true,
      isSignupSucceed: false,
      isLoginShow: false,
      isLoginSucceed: false,
    }
  );

  /**
   * this is object consist of state and dispatch of
   * signup and login state.and provided to usercontext
   */
  const signupLoginObj = {
    state: signupLoginstate,
    dispach: signupLoginDispatch,
  };

  useEffect(() => {
    if (signupLoginstate.isLoginSucceed) {
      /**
       * called display fn fetch weather data from server.
       * and handle promise.
       */
      new Promise((resolve, reject) => {
        resolve(displayFn(loginData));
      }).then((result) => {
        setdisplayData(result);
        setisLoading(false);
      });
    }

    return;
  }, [signupLoginstate]);

  return (
    <userContext.Provider
      value={[signupLoginObj, setloginData, displayData, isLoading]}
    >
      {props.children}
    </userContext.Provider>
  );
};
export default UserContextProvider;
