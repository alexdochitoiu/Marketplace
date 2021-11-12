import Logo from "../generic/Logo";
import Nav from "./Nav";
import "./Header.styles.css";
// import Search from "./Search";
import CartButton from "./CartButton";
import React from "react";
import WishlistButton from "./WishlistButton";
import useWindowDimensions from "src/utils/customHooks/useWindowDimensions";
import MobileNav from "./MobileNav";
import LogoIcon from "../generic/Logo/LogoIcon";

export default function () {
  const [sticky, setSticky] = React.useState(false);
  // const [searchVisible, setSearchVisible] = React.useState(false);
  const windowSize = useWindowDimensions();

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setSticky(window.scrollY >= 150);
  };

  return windowSize.width >= 900 ? (
    <header
      id="header"
      className={sticky ? "animate__animated animate__slideInDown sticky" : ""}
    >
      <div className="container header-wrapper">
        <div style={{ marginLeft: 15 }}>
          <Logo />
        </div>
        <Nav />
        <div
          className="flex-row"
          style={
            windowSize.width <= 428
              ? { flexDirection: "column", margin: 10 }
              : { width: 60, justifyContent: "space-around" }
          }
        >
          <WishlistButton darkBg={true} />
          <CartButton darkBg={true} />
        </div>
      </div>
    </header>
  ) : (
    <header id="header">
      <div className="container header-wrapper">
        <MobileNav />
      </div>
    </header>
  );
}
