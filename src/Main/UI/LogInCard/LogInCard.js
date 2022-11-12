import "./LogInCard.css";
import FormHeader from "../FormHeader/FormHeader";
/**
 * It is Reusable UI component.
 * used in SignUp and LogIn.
 */
const LogInCard = (props) => {
  return (
    <div className="login-card">
      <FormHeader description={props.description} />
      {props.children}
    </div>
  );
};
export default LogInCard;
