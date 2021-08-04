import {
  Divider,
  IconButton,
  List,
  makeStyles,
  Drawer,
  Theme,
} from "@material-ui/core";
import * as routes from "src/constants/routes";
import CategoryIcon from "@material-ui/icons/Category";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import clsx from "clsx";
import * as auth from "src/services/auth";
import { useHistory } from "react-router-dom";
import { DRAWER_OPENED_WIDTH, DRAWER_CLOSED_WIDTH } from "../constants";
import ButtonItem from "./ButtonItem";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: DRAWER_OPENED_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: DRAWER_OPENED_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: DRAWER_CLOSED_WIDTH,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
  },
}));

const items = [
  { text: "Home", icon: <HomeIcon />, path: routes.HOME },
  { text: "Categories", icon: <CategoryIcon />, path: routes.CATEGORIES },
  { text: "Products", icon: <CardGiftcardIcon />, path: routes.PRODUCTS },
  {
    text: "Uploaded photos",
    icon: <PhotoLibraryIcon />,
    path: routes.IMAGES,
  },
];

interface IProps {
  open: boolean;
  onChange: (status: boolean) => void;
}

export default function ({ open, onChange }: IProps) {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    onChange(false);
  };

  const handleOpen = () => {
    onChange(true);
  };

  const handleLogout = () => {
    auth.logout();
    history.push(routes.LOGIN);
  };

  return (
    <Drawer
      open={open}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={open ? handleClose : handleOpen}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {items.map((item, index) => (
          <ButtonItem
            key={index}
            onClick={() => history.push(item.path)}
            icon={item.icon}
            text={item.text}
            active={window.location.pathname === item.path}
            tooltip={!open}
          />
        ))}
      </List>
      <div style={{ marginTop: "auto" }}>
        <Divider />
        <ButtonItem
          onClick={handleLogout}
          icon={<ExitToAppIcon />}
          text="Log out"
          tooltip={!open}
        />
      </div>
    </Drawer>
  );
}
