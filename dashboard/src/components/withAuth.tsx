import { Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/auth";
import * as routes from "../constants/routes";

export default function withAuth(WrappedComponent: JSX.Element) {
  const auth = isLoggedIn();
  console.log({ auth });
  return auth ? WrappedComponent : <Redirect to={routes.LOGIN} />;
}
