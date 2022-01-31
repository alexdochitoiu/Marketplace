import { createTheme, Fab, ThemeProvider } from "@material-ui/core";
import { Route, Router, Switch } from "react-router-dom";
import "./App.styles.css";
import "animate.css";
import Header from "./Header";
import history from "src/constants/history";
import Footer from "./Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import GoToCartButton from "./GoToCartButton";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { PHONE } from "src/constants/contact";
import TermsAndConditions from "./pages/Information/TermsAndConditions";
import PoliticaDeConfidentialitate from "./pages/Information/PoliticaDeConfidentialitate";
import PoliticaDeRetur from "./pages/Information/PoliticaDeRetur";
import CookieConsent from "./CookieConsent";
import ReactPixel from "src/ReactPixel";
import React from "react";
import ArticoleDeSezonDeCareAiNevoie from "./pages/Blog/ArticoleDeSezonDeCareAiNevoie";
import RegulamentConcurs from "./pages/Blog/RegulamentConcurs";
import IntretinereaHainelorSiAccesoriilorDinBlana from "./pages/Blog/IntretinereaHainelorSiAccesoriilorDinBlana";

const theme = createTheme({
  palette: {
    primary: {
      main: "#91610f",
    },
    secondary: {
      main: "#222",
    },
  },
});

export default function App() {
  React.useEffect(() => {
    ReactPixel.pageView();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route
            exact={true}
            path={["/produse/section/:sectionType", "/produse/:categoryId"]}
            component={Products}
          />
          <Route exact={true} path="/produs/:productId" component={Product} />
          <Route exact={true} path="/blog" component={Blog} />
          <Route
            exact={true}
            path="/blog/articole-de-sezon-de-care-ai-nevoie"
            component={ArticoleDeSezonDeCareAiNevoie}
          />
          <Route
            exact={true}
            path="/blog/regulament-concurs"
            component={RegulamentConcurs}
          />
          <Route
            exact={true}
            path="/blog/intretinerea-hainelor-din-blana"
            component={IntretinereaHainelorSiAccesoriilorDinBlana}
          />
          <Route exact={true} path="/despre-noi" component={AboutUs} />
          <Route exact={true} path="/contact" component={Contact} />
          <Route exact={true} path="/favorite" component={Wishlist} />
          <Route exact={true} path="/cos-de-cumparaturi" component={Cart} />
          <Route exact={true} path="/checkout" component={Checkout} />
          <Route
            exact={true}
            path="/informatii/termenii-si-conditiile"
            component={TermsAndConditions}
          />
          <Route
            exact={true}
            path="/informatii/politica-de-confidentialitate"
            component={PoliticaDeConfidentialitate}
          />
          <Route
            exact={true}
            path="/informatii/politica-de-retur"
            component={PoliticaDeRetur}
          />
          <Route
            exact={true}
            path="/comanda/:orderId"
            component={OrderDetails}
          />
        </Switch>
        <GoToCartButton />
        <Footer />
      </Router>
      <a href={`https://api.whatsapp.com/send?phone=${PHONE}`}>
        <Fab
          size="small"
          style={{
            backgroundColor: "#25D366",
            color: "#FFF",
            position: "fixed",
            bottom: 10,
            left: 10,
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </a>
      <CookieConsent />
    </ThemeProvider>
  );
}
