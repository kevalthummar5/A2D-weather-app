/**
 * this function is set error message
 * @param   {Array} errorary it consist of
 * errormessage,type of inputs,value of inputs,
 * and validity of that input
 *
 * @param   {object} formstate it is a form state and that
 * consist of input,errormessage,and validity of entire form
 * @return  {object} formstate after set errormessage at appropiate place
 * output in form state consist of three object.
 * 1. error object set the error.
 * 2. validity object contain validity of following inputs.
 * 3. inputs value for final out put(send post request with this object).
 */
export const errorSetter = (errorAry, formstate) => {
  let finalErrorObj = {};
  let finalValidityObj = {};
  let finalInputObj = {};

  /**
   * check for validity if errormessage found empty string than it sets valid true
   */
  let isValid = errorAry[0].trim().length === 0 ? true : false;

  /**
   * loop that set errormessage at appropiate place and return remaing state as it is.
   */
  for (let [key, value] of Object.entries(formstate[0])) {
    if (key === errorAry[1]) {
      finalErrorObj[key] = errorAry[0];
    } else {
      finalErrorObj[key] = value;
    }
  }

  /**
   * loop that set validity of inputs at appropiate place and return remaing state as it is.
   */
  for (let [key, value] of Object.entries(formstate[1])) {
    if (key === errorAry[2]) {
      finalValidityObj[key] = isValid;
    } else {
      finalValidityObj[key] = value;
    }
  }

  /**
   * loop that set input values at appropiate place and return remaing state as it is.
   */
  for (let [key, value] of Object.entries(formstate[2])) {
    if (key === errorAry[4]) {
      finalInputObj[key] = errorAry[3];
    } else {
      finalInputObj[key] = value;
    }
  }

  return [finalErrorObj, finalValidityObj, finalInputObj];
};

/**
 * this function is for checking input of name field and output the error message
 * based on that input.
 * @param   {string} param1 input value
 * @param   {string} param2 input type
 *
 * @return  {Array} it output error message, input value,input type
 * and also other two string for help error setter to set appropiate
 * form state
 */
export const nameChecker = (actionInput, actionType) => {
  let errMsg = "";

  if (actionInput.length === 0) {
    errMsg = "name feild should not be empty";
  } else {
    errMsg = " ";
  }
  return [errMsg, actionType, "isNameValid", actionInput, "name"];
};

/**
 * this function is for checking input of phone field and output the error message
 * based on that input.
 * @param   {string} param1 input value
 * @param   {string} param2 input type
 *
 * @return  {Array} it output error message, input value,input type
 * and also other two string for help error setter to set appropiate
 * form state
 */
export const phoneChecker = (actionInput, actionType) => {
  let errMsg = "";
  if (actionInput.length === 0) {
    errMsg = "phone no should not be empty";
  } else if (/[^0-9]/.test(actionInput)) {
    errMsg = "phone no should be in digits";
  } else if (actionInput.length != 10) {
    errMsg = "phone no should be 10 digits";
  } else {
    errMsg = " ";
  }
  return [errMsg, actionType, "isPhoneValid", actionInput, "phone"];
};

/**
 * this function is for checking input of country field and output the error message
 * based on that input.
 * @param   {string} param1 input value
 * @param   {string} param2 input type
 *
 * @return  {Array} it output error message, input value,input type
 * and also other two string for help error setter to set appropiate
 * form state
 */
export const countryChecker = (actionInput, actionType) => {
  let errMsg = "";
  if (actionInput === "country") {
    errMsg = " select any country from below list";
  } else {
    errMsg = " ";
  }
  return [errMsg, actionType, "isCountryValid", actionInput, "country"];
};

/**
 * this function is for checking input of email field and output the error message
 * based on that input.
 * @param   {string} param1 input value
 * @param   {string} param2 input type
 *
 * @return  {Array} it output error message, input value,input type
 * and also other two string for help error setter to set appropiate
 * form state
 */
export const emailChecker = (actionInput, actionType) => {
  let errMsg = "";
  if (!actionInput.length > 0) {
    errMsg = " email field should not be empty";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(actionInput)
  ) {
    errMsg = " please enter valid email";
  } else {
    errMsg = " ";
  }
  return [errMsg, actionType, "isEmailValid", actionInput, "email"];
};

/**
 * this function is for checking input of password field and output the error message
 * based on that input.
 * @param   {string} param1 input value
 * @param   {string} param2 input type
 *
 * @return  {Array} it output error message, input value,input type
 * and also other two string for help error setter to set appropiate
 * form state
 */
export const passwordChecker = (actionInput, actionType) => {
  let errMsg = "";
  let finalStr = "";
  let upperStr = "";
  let lowerStr = "";
  let specialStr = "";
  let digitStr = "";
  let strLength = "";

  if (!actionInput.length > 0) {
    errMsg = " password field should not be empty";
  } else {
    if (!/.*[A-Z]/.test(actionInput)) {
      upperStr = "uppercase letter,";
    }
    if (!/.*[a-z]/.test(actionInput)) {
      lowerStr = "lowercase letter,";
    }
    if (!/.*[@#$%^&*.,?]/.test(actionInput)) {
      specialStr = " special character,";
    }
    if (!/.*\d/.test(actionInput)) {
      digitStr = "One digit,";
    }
    if (actionInput.length < 8) {
      strLength = "atleast 8 charasters.";
    }
    finalStr = `${upperStr} ${lowerStr} ${specialStr} ${digitStr} ${strLength}`;
    if (finalStr.trim().length === 0) {
      errMsg = "";
    } else {
      errMsg = "It should contain " + finalStr;
    }
  }
  return [errMsg, actionType, "isPasswordValid", actionInput, "password"];
};
