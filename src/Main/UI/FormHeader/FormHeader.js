import "./FormHeader.css";
import { FaTimes } from "react-icons/fa";

import { mainicon } from "../../../Store/Imgcontext";

/**
 * It is Reusable UI component.
 * used in LogINCard.
 */
const FormHeader = (props) => {
  return (
    <div className="formheader">
      <span className="formheader-close">
        <FaTimes />
      </span>
      <img className="formheader-icon" src={mainicon} />
      <h3 className="formheader-heading">Forcasting</h3>
      <p className="formheader-enterdetail">{props.description}</p>
    </div>
  );
};
export default FormHeader;
