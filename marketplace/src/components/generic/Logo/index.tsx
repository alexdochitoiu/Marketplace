import { Link } from "react-router-dom";
import "./Logo.styles.css";

export default function () {
  return (
    <Link to="/">
      <div className="logo">Brand</div>
    </Link>
  );
}
