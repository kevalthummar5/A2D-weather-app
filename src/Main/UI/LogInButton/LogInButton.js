import "./LogInButton.css";
/**
 * It is Reusable UI component.
 * used in many components.
 */
const LogInButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`login-button ${props.invalid}`}
      type={props.type}
    >
      {props.title}
    </button>
  );
};

export default LogInButton;
