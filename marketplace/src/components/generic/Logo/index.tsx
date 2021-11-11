import { Link } from "react-router-dom";
import "./Logo.styles.css";
// import logoBlack from "src/assets/logo-black.jpeg";
import icon from "src/assets/icon.png";

export default function () {
  return (
    <Link to="/">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={icon} width={45} height={45} />
        <div className="logo" style={{ marginLeft: 15 }}>
          <h1>Miral</h1>
          <h3>FASHION</h3>
        </div>
        {/* <img src={logoBlack} width={100} height={36} /> */}
      </div>
      {/* <img src={logo} width={100} height={36} /> */}
    </Link>
  );
}
