import { Link } from "react-router-dom";
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
      </div>
    </Link>
  );
}
