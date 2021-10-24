import { Link } from "react-router-dom";
import "./Logo.styles.css";

export default function () {
  return (
    <Link to="/">
      <div className="logo">
        <h1>Miral</h1>
        <h3>FASHION</h3>
      </div>
    </Link>
  );
}
