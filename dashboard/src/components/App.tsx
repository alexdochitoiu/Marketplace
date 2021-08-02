import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import NotFound from "./NotFound";
import withAuth from "./withAuth";
import * as routes from "../constants/routes";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { isLoggedIn } from "src/services/auth";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E8B57",
    },
    secondary: {
      main: "#2F4F4F",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact={true} path={routes.LOGIN}>
            <Login />
          </Route>
          <Route exact={true} path="/">
            {<Redirect to={isLoggedIn() ? routes.HOME : routes.LOGIN} />}
          </Route>
          {withAuth(<Dashboard />)}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
