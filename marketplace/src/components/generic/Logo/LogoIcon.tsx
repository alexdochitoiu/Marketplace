import { Link } from "react-router-dom";
import icon from "src/assets/icon.png";

export default function () {
  return (
    <Link to="/">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={icon} height={60} />
      </div>
    </Link>
  );
}
