import Logo from "../generic/Logo";
import Nav from "./Nav";
import "./Header.styles.css";
import Search from "./Search";
import CartButton from "./CartButton";
import React from "react";
import WishlistButton from "./WishlistButton";
import useWindowDimensions from "src/utils/customHooks/useWindowDimensions";
import MobileNav from "./MobileNav";

export default function () {
  const [sticky, setSticky] = React.useState(false);
  const [searchVisible, setSearchVisible] = React.useState(false);
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

  let webNav = true;
  if (windowSize.width <= 1000 && searchVisible) {
    webNav = false;
  }
  if (windowSize.width < 900) {
    webNav = false;
  }
  return (
    <header
      id="header"
      className={sticky ? "animate__animated animate__slideInDown sticky" : ""}
    >
      <div className="container header-wrapper">
        <div style={{ marginLeft: 15 }}>
          <Logo />
        </div>
        {webNav ? <Nav /> : <MobileNav />}
        <div
          className="flex-row"
          style={windowSize.width <= 428 ? { flexDirection: "column", margin: 10 } : { width: 100, justifyContent: "space-around"}}
        >
          {windowSize.width > 428 && (
            <Search onVisibleChange={(value) => setSearchVisible(value)} />
          )}
          <WishlistButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
