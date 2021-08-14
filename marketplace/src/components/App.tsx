import { createTheme, ThemeProvider } from "@material-ui/core";
import "./App.styles.css";
import Header from "./Header";

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
      <div>
        <Header />
        <div>Content</div>
      </div>
    </ThemeProvider>
  );
}
