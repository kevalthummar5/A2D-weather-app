import BackDrop from "../../../UI/BackDrop/BackDrop";
import "./CityListModel.css";
import { FaArrowLeft, FaMicrophone, FaMapMarkerAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import userContext from "../../../../Store/user-context";

/**
 * This component render city list utilize usercontext .
 * and also call for live weather data.
 * by seleced city.
 */
const CityListModel = (props) => {
  const [signupLoginObj, setloginData, displayData] = useContext(userContext);

  /**
   * This filter citylist by inputbox value.
   */
  const [cityListIN, setcityListIN] = useState(displayData.cityList);

  const listFilterHandler = (e) => {
    setcityListIN(
      displayData.cityList.filter((data) => data.name.includes(e.target.value))
    );
  };

  const selectHandler = (e) => {
    props.cityModelShow(false);

    // future call for live weather data
  };
  return (
    <div>
      <BackDrop onClick={() => props.cityModelShow(false)} />
      <div className="citylist-model">
        <div>
          <i
            className="back-input-icon"
            onClick={() => props.cityModelShow(false)}
          >
            <FaArrowLeft />
          </i>
          <input
            className="search-input"
            placeholder="Search Here"
            type="text"
            onChange={listFilterHandler}
          />
          <i className="microphone-input">
            <FaMicrophone />
          </i>
        </div>
        <table className="searchitem-table">
          <tbody>
            {cityListIN.map((data) => {
              return (
                <tr
                  key={data._id}
                  className="searchitem-raw"
                  onClick={(e) => selectHandler(data)}
                >
                  <td>
                    <FaMapMarkerAlt />
                  </td>
                  <td>{data.name}</td>
                  <td>{`${data.maxTemperature}°C/${data.minTemperature}°C`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CityListModel;
