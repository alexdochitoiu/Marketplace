import axios from "axios";
import decode from "jwt-decode";
import { LOGIN } from "../constants/endpoints";
import IFeedback from "../types/IFeedback";

interface ICredentials {
  username: string;
  password: string;
}
const TOKEN_KEY = "dashboard-token";

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const isLoggedIn = (): boolean => {
  const token = getToken();
  if (!token) {
    return false;
  }
  const { exp } = decode<{ exp: number }>(token);
  if (exp < Date.now() / 1000) {
    return false;
  }
  return true;
};

const login = async (credentials: ICredentials): Promise<IFeedback> => {
  return await axios
    .post(LOGIN, credentials)
    .then(({ data }) => {
      const { token } = data;
      setToken(token);
      return { succeeded: true };
    })
    .catch((error) => {
      if (error.response) {
        const { message } = error.response.data;
        return {
          succeeded: false,
          message,
        };
      }
      return {
        succeeded: false,
        message: "Something went wrong",
      };
    });
};

export { login, logout, getToken, isLoggedIn };
