import { Link } from "react-router-dom";
import "./Logo.styles.css";
import logo from "src/assets/logo.png";

export default function () {
  return (
    <Link to="/">
      {/* <div className="logo">
        <h1>Miral</h1>
        <h3>FASHION</h3>
      </div> */}
      <img src={logo} width={100} height={36} />
    </Link>
  );
}
