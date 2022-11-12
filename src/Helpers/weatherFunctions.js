import { imgAry, iconAry } from "../Store/Imgcontext";
import { getData } from "./userFunctions";

/**
 * This function is for get live weather data.
 * @param   {string} param1 city id.
 * @param   {string} param2 token got after succesful login
 * @return  {object} response of called get request
 *  with appropiate param   in this function.
 */
export const liveWeatherFn = (id, token) => {
  return getData(`live-weather/${id}`, token);
};

/**
 * This function is for get forecast data.
 * @param   {string} param1 city id.
 * @param   {string} param2 token got after succesful login
 * @return  {object} response of called get request
 *  with appropiate param in this function.
 */
export const forecastReportFn = (id, token) => {
  return getData(`view-other-forecast/${id}`, token);
};

/**
 * This function is for get city list.
 * @param   {string} param1 token got after succesful login
 * @return  {object} response of called get request
 *  with appropiate param in this function.
 */
export const cityListFn = (token) => {
  return getData("city-list?page=1&limit=50", token);
};

/**
 * This is main function responsible for screen
 * after login , output object with appropiate
 *  arrays,objects,image url,icons refrence.
 * @param   {object} param1 data that get after
 * succesful login.
 * @return  {object} main object with data to display.
 */
export const displayFn = async (loginData) => {
  /**
   * This is main object contain main screen data
   * after login.
   */
  let displayObj = {};

  /**
   * live weatherdata: output of weather data function.
   */
  let liveWeatherData = await liveWeatherFn(loginData.cityId, loginData.token);

  /**
   * set imageurl depands on the condition of weather
   *  it takes array og images url from store and compare with
   * the weather data and bind image url with
   * weather data.main condition image in DayReport component.
   */
  let conditionImg = imgAry.filter(
    (e) =>
      Object.keys(e)[0] ===
      liveWeatherData.data.data.condition.split("-").join("")
  );
  displayObj.imgURL = Object.values(conditionImg[0])[0];

  displayObj.condition = liveWeatherData.data.data.condition;

  /**
   * weather items responsible for rendering data in
   * DayReport component.
   */
  let weatherItems = [];

  /**
   * loop for set appropiate icon refrence to appropiate
   * weather quantity.
   * it takes array of icon refrence from store and weather
   * quantity from weather data and output icon refrence
   * with appropiate weather quantity.
   */
  for (let [iconkey, iconvalue] of Object.entries(iconAry)) {
    let weatherDataObj = {};
    for (let [keys, values] of Object.entries(liveWeatherData.data.data)) {
      if (iconkey === keys) {
        weatherDataObj.title = iconkey;
        weatherDataObj.iconId = iconvalue;
        weatherDataObj.quantity = values;
      }
    }

    weatherItems.push(weatherDataObj);
  }
  displayObj.weatherItems = weatherItems;

  displayObj.token = loginData.token;

  displayObj.temperature = liveWeatherData.data.data.temperature;

  /**
   * citylist : output of citylist function.
   */
  const cityList = await cityListFn(loginData.token);

  /**
   * filteredcitylist : filter citylist for max and min
   * temperature.
   * this is responsible for output data of CityListModel
   * component.
   */
  const filteredCity = cityList.data.list.filter((obj) => {
    return (
      Object.keys(obj).includes("minTemperature") &&
      Object.keys(obj).includes("maxTemperature")
    );
  });
  displayObj.cityList = filteredCity;

  /**
   * forecast : output of forecastreport function.
   */
  const forecast = await forecastReportFn(filteredCity[1]._id, loginData.token);

  /**
   * forecast items responsible for rendering data in
   * ForecastReport component.
   */
  let forecastItems = [];

  /**
   * loop for set appropiate imageUrl refrence to appropiate
   * condition.
   * it takes array of imageUrl refrence from store and weather
   * quantity from weather data and output imageUrl refrence
   * with appropiate weather condition.
   */
  for (let [datakey, datavalue] of Object.entries(forecast.data.DATA)) {
    let forecastDataObj = {};
    if (datakey !== "cityId") {
      forecastDataObj.day = datakey;
      forecastDataObj.quantity = datavalue.temperature;

      let filteredObj = imgAry.filter((e) => {
        return (
          Object.entries(e)[0][0] === datavalue.condition.split("-").join("")
        );
      });

      forecastDataObj.imgURL = Object.entries(filteredObj[0])[0][1];
      forecastItems.push(forecastDataObj);
    }
  }
  displayObj.forecastItems = forecastItems;

  return displayObj;
};
