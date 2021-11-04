import { Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import NotFound from "./NotFound";
import withAuth from "./withAuth";
import * as routes from "../constants/routes";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { isLoggedIn } from "src/services/auth";
import history from "src/constants/history";
import "./style.css";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact={true} path={routes.LOGIN} component={() => <Login />} />
          <Route
            exact={true}
            path="/"
            component={() => (
              <Redirect to={isLoggedIn() ? routes.HOME : routes.LOGIN} />
            )}
          />
          {withAuth(<Dashboard />)}
          <Route component={() => <NotFound />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
