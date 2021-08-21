import { createTheme, ThemeProvider } from "@material-ui/core";
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
import BackToTopButton from "./BackToTopButton";
import Product from "./pages/Product";

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
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route
            exact={true}
            path={["/produse", "/produse/:categoryId"]}
            component={Products}
          />
          <Route exact={true} path="/produs/:productId" component={Product} />
          <Route exact={true} path="/blog" component={Blog} />
          <Route exact={true} path="/despre-noi" component={AboutUs} />
          <Route exact={true} path="/contact" component={Contact} />
        </Switch>
        <BackToTopButton />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
