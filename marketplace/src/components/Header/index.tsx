import Logo from "../generic/Logo";
import Nav from "./Nav";
import "./Header.styles.css";
import Search from "./Search";
import CartButton from "./CartButton";
import React from "react";
import clsx from "clsx";

export default function () {
  const [sticky, setSticky] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setSticky(window.scrollY >= 150);
  };

  return (
    <header
      id="header"
      className={
        sticky ? "animate__animated animate__slideInDown sticky" : ""
      }
    >
      <div className="container header-wrapper">
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
