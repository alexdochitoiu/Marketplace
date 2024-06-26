import { Link } from "react-router-dom";
import "./Logo.styles.css";
import logo from "src/assets/logo_x80.png";
import icon from "src/assets/icon_100x.png";

export default function () {
  return (
    <Link to="/">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={icon}
          height={60}
          alt="Miral-Fashion.ro - Articole vestimentare din blana naturala (logo, icon, golden)"
        />
        <img
          src={logo}
          height={45}
          style={{ marginLeft: 8 }}
          alt="Miral-Fashion.ro - Articole vestimentare din blana naturala (logo, icon, golden)"
        />
      </div>
    </Link>
  );
}
