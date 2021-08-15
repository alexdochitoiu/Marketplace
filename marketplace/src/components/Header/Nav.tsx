import { FaAngleDown } from "react-icons/fa";

export default function () {
  return (
    <nav>
      <ul className="main-menu">
        <li>Acasa</li>
        <li>
          <a className="flex-row">
            Produse <FaAngleDown />
          </a>
          <ul className="sub-menu">
            <li>Sub 1</li>
            <li>Sub 2</li>
            <li>Sub 3</li>
          </ul>
        </li>
        <li>Blog</li>
        <li>Despre noi</li>
        <a href="/contact">
          <li>Contact</li>
        </a>
      </ul>
    </nav>
  );
}
