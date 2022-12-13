import "./Congratulation.css";
import LogInCard from "../UI/LogInCard/LogInCard";
import { smily } from "../../Store/Imgcontext";
import { FaAngleLeft } from "react-icons/fa";
import { useContext } from "react";
import userContext from "../../Store/user-context";
import { Link } from "react-router-dom";

/**
 * This component render after succesfull signed up.
 */
const Congratulation = () => {
  const [signupLoginObj] = useContext(userContext);

  return (
    <LogInCard>
      <div>
        <img className="congo-img" src={smily} />
        <h2 className="congo-heading">Congratulation</h2>

        <p className="congo-line">Your Account Created Succesfully.</p>
      </div>

      <div
        className="congo-bottomline"
        onClick={() => {
          signupLoginObj.dispach({ type: "signupShow" });
        }}
      >
        <i className="congo-backicon">
          <FaAngleLeft />
        </i>
        <span>
          &nbsp; <Link to="/">Back to Sign up</Link>
        </span>
      </div>
    </LogInCard>
  );
};
export default Congratulation;
