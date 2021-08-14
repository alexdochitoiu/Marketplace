import { BsSearch } from "react-icons/bs";
import "./Search.styles.css";

export default function () {
  return (
    <div className="search-box">
      <button className="btn-search">
        <BsSearch className="btn search-icon" />
      </button>
      <input className="input-search" type="text" placeholder="Cautare..." />
    </div>
  );
}
