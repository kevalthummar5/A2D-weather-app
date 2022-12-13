/**
 * This is main image store consist
 * array of icons refrence and image url
 * that used in many components, and used in display
 * function.
 */

import React from "react";
import cloudy from "../Images/cloud.png";
import mainicon from "../Images/a2dicon.png";
// import mainicon from "../Images/kt.png";
import mobile from "../Images/mobile.png";
import moon from "../Images/moon.png";
import partcloudy from "../Images/partcloudy.png";
import rainy from "../Images/rainy.png";
import smily from "../Images/smily.png";
import snow from "../Images/snow.png";
import stormy from "../Images/stromy.png";
import sunny from "../Images/sunny.png";
import thunder from "../Images/thunder.png";
import {
  FaRegCalendarAlt,
  FaTemperatureLow,
  FaThermometerFull,
  FaThermometerHalf,
  FaCloudMoonRain,
  FaWind,
  FaTint,
  FaClock,
} from "react-icons/fa";
let Calander = {};
Calander.id = FaRegCalendarAlt;

/**
 * array of icon refrence (imported from react icons).
 */
export const iconAry = {
  // time: [FaClock, ""],
  condition: { id: FaCloudMoonRain, symbol: "" },
  minTemperature: { id: FaTemperatureLow, symbol: "°C" },
  maxTemperature: { id: FaThermometerFull, symbol: "°C" },
  temperature: { id: FaThermometerHalf, symbol: "°C" },
  windSpeed: { id: FaWind, symbol: `Km/h` },
  humidity: { id: FaTint, symbol: "%" },
};

/**
 * array of image Url (imported from react icons).
 */
export const imgAry = [
  { Cloudy: cloudy },
  { Moon: moon },
  { PartlyCloudy: partcloudy },
  { Rainy: rainy },
  { Snow: snow },
  { Stormy: stormy },
  { Sunny: sunny },
  { Thunder: thunder },
];

export { mainicon };
export { smily };
export { mobile };
export { cloudy };
export { Calander };
