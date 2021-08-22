import {
  Dialog,
  DialogContent,
  makeStyles,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import React from "react";
import { BsFillInfoSquareFill } from "react-icons/bs";
import hatSizeGuideImg from "src/assets/images/masuratoare-palarii.png";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#666",
    transition: "all 0.3s ease-in",
    "& > svg": {
      marginRight: 6,
    },
    "&:hover": {
      color: "var(--primary)",
    },
  },
  dialogRoot: {
    width: "100%",
  },
  title: {
    padding: 20,
    fontSize: 24,
    textAlign: "center",
    color: "#444",
  },
  tabRoot: {
    background: "#eee",
    border: "1px solid #ddd",
  },
});

export default function () {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a className={classes.root} onClick={() => setOpen(true)}>
        <BsFillInfoSquareFill style={{ width: 20, height: 20 }} />
        GHIDUL MĂRIMILOR
      </a>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
      >
        <h4 className={classes.title}>GHIDUL MĂRIMILOR</h4>
        <DialogContent style={{ borderTop: "1px solid #ddd" }}>
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab
              classes={{ root: classes.tabRoot }}
              label="HAINE ȘI VESTE DE BLANĂ"
            />
            <Tab
              classes={{ root: classes.tabRoot }}
              label="CĂCIULI DE BLANĂ ȘI PĂLĂRII"
            />
          </Tabs>
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={(index) => setValue(index)}
          >
            <TabPanel value={value} index={0}>
              <h4>HAINE ȘI VESTE DE BLANĂ</h4>
              <img src={hatSizeGuideImg} width={712} height={400} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <h4>CĂCIULI DE BLANĂ ȘI PĂLĂRII</h4>
              <img
                src={hatSizeGuideImg}
                width={712}
                height={400}
                style={{ border: "1px solid #eee" }}
              />
              <p>
                Pentru a va afla marimea luati un centimetru de croitorie pe
                care il infasurati in jurul capului, asigurandu-va ca masurati
                in zona urechilor, in zona in care prefarati sa purtati palaria.
                Desi este o optiune personala, un loc bun pentru a efectua
                masuratoarea este in partea cea mai proeminenta a capului
                deoarece acolo se potriveste cel mai bine o palarie. Dupa ce
                obtineti masuratoarea, consultati tabelele de mai jos.
              </p>
            </TabPanel>
          </SwipeableViews>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ border: "1px solid #ddd", margin: 1 }}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
