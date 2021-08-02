import {
  Avatar,
  Link,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Card,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import * as auth from "src/services/auth";
import * as routes from "src/constants/routes";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Snackbar from "../shared/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    height: "100%",
  },
  container: {
    position: "relative",
    top: theme.spacing(8),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "white",
    padding: "2px 10px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid white",
      borderRadius: 3,
      textDecoration: "none",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    auth.login({ username, password }).then((res) => {
      if (res.succeeded) {
        history.push(routes.HOME);
      } else {
        setError(
          res.message || "Cannot login to dasboard. Something went wrong!"
        );
      }
    });
  };

  const handleClose = () => {
    setError("");
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Card elevation={1} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dashboard login
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              size="small"
              variant="outlined"
              margin="normal"
              required={true}
              id="username"
              label="Username"
              name="username"
              autoFocus={true}
              fullWidth={true}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth={true}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </Card>
        <Box mt={8}>
          <Link href="/" variant="body2" className={classes.link}>
            &#129044; Back to marketplace
          </Link>
        </Box>
      </Container>
      <Snackbar text={error} onClose={handleClose} severity="error" />
    </div>
  );
}
