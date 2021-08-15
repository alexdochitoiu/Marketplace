import { createTheme, ThemeProvider } from "@material-ui/core";
import { Route, Router, Switch } from "react-router-dom";
import "./App.styles.css";
import Header from "./Header";
import history from "src/constants/history";
import Footer from "./Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "animate.css";

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
          <Route exact={true} path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
