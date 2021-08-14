import Logo from "../generic/Logo";
import Nav from "./Nav";
import "./Header.styles.css";
import Search from "./Search";
import CartButton from "./CartButton";

export default function () {
  return (
    <header style={{ borderBottom: "1px solid #ccc"}}>
      <div className="container header">
        <Logo />
        <Nav />
        <div className="flex-row">
          <Search />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
