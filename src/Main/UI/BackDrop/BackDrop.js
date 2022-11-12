import "./BackDrop.css";
/**
 * It is Reusable UI component.
 * used in CityListmodel and LogoutModel
 */
const BackDrop = (props) => {
  return (
    <div onClick={props.onClick} className="backdrop">
      {props.children}
    </div>
  );
};

export default BackDrop;
