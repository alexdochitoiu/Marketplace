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
import hatSizeGuideImg from "src/assets/images/hat-size-guide.png";
import clothesSizeGuideImg from "src/assets/images/clothes-size-guide.png";
import SwipeableViews from "react-swipeable-views";
import { GrClose } from "react-icons/gr";
import useWindowDimensions from "src/utils/customHooks/useWindowDimensions";

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
    position: "relative",
    padding: 20,
    fontSize: 24,
    textAlign: "center",
    color: "#444",
  },
  tabRoot: {
    background: "#eee",
    border: "1px solid #ddd",
  },
  tabSelected: {
    background: "#fff",
  },
  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    right: 15,
    top: 15,
    stroke: "#444",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      "& > path": {
        stroke: "#fff",
      },
      background: "var(--primary)",
    },
  },
  sizesTable: {
    marginTop: 35,
    width: "100%",
    borderSpacing: 0,
    "& > tr:first-child": {
      background: "#efefef",
    },
    "& th": {
      border: "1px solid #ddd",
      background: "#efefef",
    },
    "& td": {
      border: "1px solid #ddd",
      textAlign: "center",
    },
  },
});

export default function () {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const windowSize = useWindowDimensions();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a className={classes.root} onClick={() => setOpen(true)}>
        <BsFillInfoSquareFill style={{ width: 20, height: 20 }} />
        GHIDUL MĂRIMILOR
      </a>
      {windowSize.width <= 600 ? (
        <Dialog fullWidth={true} open={open} onClose={handleClose}>
          <h4 className={classes.title} style={{ fontSize: 14 }}>
            <GrClose className={classes.closeIcon} onClick={handleClose} />
            GHIDUL MĂRIMILOR
          </h4>
          <DialogContent style={{ borderTop: "1px solid #ddd" }}>
            <div>
              <h4 style={{ fontSize: 13, color: "var(--primary)" }}>
                HAINE ȘI VESTE DE BLANĂ
              </h4>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  src={clothesSizeGuideImg}
                  width="100%"
                  height="auto"
                  alt="Ghid de marimi pentru haine"
                />
                <div>
                  <p
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
                  >
                    Ai nevoie, in primul rand, de un centimetru de croitorie. Cu
                    ajutorul acestuia, vei realiza masuratorile corpului tau.
                    Masuratorile sunt valabile atat in cazul femeilor, cat si in
                    cazul barbatilor sau copiilor.
                    <br />
                    <br />
                    Dupa realizarea masuratorilor, va trebui doar sa compari
                    rezultatele obtinute cu datele prezente in tabelul de mai
                    jos, pentru a putea alege articolul cu marimea potrivita. In
                    cazul in care dimensiunile nu sunt numere intregi, va trebui
                    sa rotunjesti in sus.
                  </p>
                  <table
                    className={classes.sizesTable}
                    style={{ marginTop: 10, fontSize: 11 }}
                  >
                    <tr>
                      <th>Mărime</th>
                      <td>36 / XS</td>
                      <td>38 / S</td>
                      <td>40 / M</td>
                      <td>42 / L</td>
                      <td>44 / XL</td>
                      <td>46 / 2XL</td>
                      <td>48 / 3XL</td>
                      <td>50 / 4XL</td>
                    </tr>
                    <tr>
                      <th>A - Bust (cm)</th>
                      <td>82-86</td>
                      <td>86-90</td>
                      <td>90-95</td>
                      <td>95-100</td>
                      <td>100-104</td>
                      <td>104-108</td>
                      <td>108-114</td>
                      <td>114-120</td>
                    </tr>
                    <tr>
                      <th>B - Talie (cm)</th>
                      <td>64-68</td>
                      <td>70-74</td>
                      <td>76-80</td>
                      <td>82-86</td>
                      <td>89-93</td>
                      <td>95-100</td>
                      <td>100-106</td>
                      <td>106-110</td>
                    </tr>
                    <tr>
                      <th>C - Șold (cm)</th>
                      <td>90-94</td>
                      <td>94-98</td>
                      <td>98-102</td>
                      <td>102-106</td>
                      <td>106-110</td>
                      <td>110-116</td>
                      <td>116-122</td>
                      <td>122-130</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div style={{ margin: "15px 0" }}>
              <h4 style={{ fontSize: 13, color: "var(--primary)" }}>
                CĂCIULI DE BLANĂ ȘI PĂLĂRII
              </h4>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  src={hatSizeGuideImg}
                  width="100%"
                  height="auto"
                  style={{ border: "1px solid #ccc", padding: 10 }}
                  alt="Ghid de marimi pentru caciuli si palarii"
                />
                <div>
                  <p
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
                  >
                    Pentru a va afla marimea luati un centimetru de croitorie pe
                    care il infasurati in jurul capului, asigurandu-va ca
                    masurati in zona urechilor, in zona in care prefarati sa
                    purtati palaria. Desi este o optiune personala, un loc bun
                    pentru a efectua masuratoarea este in partea cea mai
                    proeminenta a capului deoarece acolo se potriveste cel mai
                    bine o palarie. Dupa ce obtineti masuratoarea, consultati
                    tabelele de mai jos.
                    <br />
                    <br />
                    Sfaturi si recomandari:
                    <ul style={{ listStyle: "disc" }}>
                      <li>
                        Masurati de mai multe ori pentru a va asigura ca
                        obtineti o masuratoare corecta
                      </li>
                      <li>
                        Nu intindeti foarte tare centimetrul, strangandu-l pe
                        cap
                      </li>
                      <li>
                        Daca va aflati la limita dintre doua dimensiuni, va
                        rugam sa o luati in considerare pe cea mai mare
                      </li>
                      <li>
                        Va rugam sa aveti in vedere ca tabelele de marimi si
                        dimensiuni sunt doar pentru referinte generale.
                        Potrivirea produselor poate varia in functie de
                        materiale, croieli si tipuri de par/coafuri.
                      </li>
                      <li>
                        Produsele care au o singura marime (marime universala)
                        se potrivesc de obicei de la S (55 cm) la L (58 cm)
                      </li>
                    </ul>
                  </p>
                  <table
                    className={classes.sizesTable}
                    style={{ marginTop: 10, fontSize: 11 }}
                  >
                    <tr>
                      <th>Mărime</th>
                      <td>53</td>
                      <td>54</td>
                      <td>55</td>
                      <td>56</td>
                      <td>57</td>
                      <td>58</td>
                      <td>59</td>
                      <td>60</td>
                      <td>61</td>
                    </tr>
                    <tr>
                      <th>Circumferință</th>
                      <td>53</td>
                      <td>54</td>
                      <td>55</td>
                      <td>56</td>
                      <td>57</td>
                      <td>58</td>
                      <td>59</td>
                      <td>60</td>
                      <td>61</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          fullWidth={true}
          maxWidth="xl"
          open={open}
          onClose={handleClose}
        >
          <h4 className={classes.title}>
            <GrClose className={classes.closeIcon} onClick={handleClose} />
            GHIDUL MĂRIMILOR
          </h4>
          <DialogContent style={{ borderTop: "1px solid #ddd" }}>
            <Tabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
                label="HAINE ȘI VESTE DE BLANĂ"
              />
              <Tab
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
                label="CĂCIULI DE BLANĂ ȘI PĂLĂRII"
              />
            </Tabs>
            <SwipeableViews
              axis="x"
              index={value}
              onChangeIndex={(index) => setValue(index)}
            >
              <TabPanel value={value} index={0}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <img
                    src={clothesSizeGuideImg}
                    width={500}
                    alt="Ghid de marimi pentru haine"
                  />
                  <div style={{ marginLeft: 25 }}>
                    <p style={{ fontFamily: "Poppins, sans-serif" }}>
                      Ai nevoie, in primul rand, de un centimetru de croitorie.
                      Cu ajutorul acestuia, vei realiza masuratorile corpului
                      tau. Atentie! Acestea se realizeaza numai in lenjerie
                      intima, stand in pozitia de drepti – atat in cazul
                      femeilor, cat si in cazul barbatilor sau copiilor.
                      <br />
                      <br />
                      Dupa realizarea masuratorilor, va trebui doar sa compari
                      rezultatele obtinute cu datele prezente in tabelul de mai
                      jos, pentru a putea alege lenjeria potrivita. In cazul in
                      care dimensiunile nu sunt numere intregi, va trebui sa
                      rotunjesti in sus.
                    </p>
                    <table className={classes.sizesTable}>
                      <tr>
                        <th>Mărime</th>
                        <td>32/34 (XS)</td>
                        <td>36/38 (S)</td>
                        <td>40/42 (M)</td>
                        <td>44/46 (L)</td>
                        <td>48/50 (XL)</td>
                        <td>52/54 (2XL)</td>
                        <td>56/58 (3XL)</td>
                      </tr>
                      <tr>
                        <th>A - Bust (cm)</th>
                        <td>74-81</td>
                        <td>82-89</td>
                        <td>90-97</td>
                        <td>98-107</td>
                        <td>108-119</td>
                        <td>120-131</td>
                        <td>132-143</td>
                      </tr>
                      <tr>
                        <th>B - Talie (cm)</th>
                        <td>60-65</td>
                        <td>66-73</td>
                        <td>74-81</td>
                        <td>82-91</td>
                        <td>92-102</td>
                        <td>103-114</td>
                        <td>115-126</td>
                      </tr>
                      <tr>
                        <th>C - Șold (cm)</th>
                        <td>84-91</td>
                        <td>92-98</td>
                        <td>99-106</td>
                        <td>107-115</td>
                        <td>116-125</td>
                        <td>126-135</td>
                        <td>136-147</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div style={{ display: "flex" }}>
                  <img
                    src={hatSizeGuideImg}
                    width={712}
                    height={400}
                    style={{ border: "1px solid #ccc", padding: 10 }}
                    alt="Ghid de marimi pentru caciuli si palarii"
                  />
                  <div style={{ marginLeft: 25 }}>
                    <p style={{ fontFamily: "Poppins, sans-serif" }}>
                      Pentru a va afla marimea luati un centimetru de croitorie
                      pe care il infasurati in jurul capului, asigurandu-va ca
                      masurati in zona urechilor, in zona in care prefarati sa
                      purtati palaria. Desi este o optiune personala, un loc bun
                      pentru a efectua masuratoarea este in partea cea mai
                      proeminenta a capului deoarece acolo se potriveste cel mai
                      bine o palarie. Dupa ce obtineti masuratoarea, consultati
                      tabelele de mai jos.
                      <br />
                      <br />
                      Sfaturi si recomandari:
                      <ul style={{ listStyle: "disc" }}>
                        <li>
                          Masurati de mai multe ori pentru a va asigura ca
                          obtineti o masuratoare corecta
                        </li>
                        <li>
                          Nu intindeti foarte tare centimetrul, strangandu-l pe
                          cap
                        </li>
                        <li>
                          Daca va aflati la limita dintre doua dimensiuni, va
                          rugam sa o luati in considerare pe cea mai mare
                        </li>
                        <li>
                          Va rugam sa aveti in vedere ca tabelele de marimi si
                          dimensiuni sunt doar pentru referinte generale.
                          Potrivirea produselor poate varia in functie de
                          materiale, croieli si tipuri de par/coafuri.
                        </li>
                        <li>
                          Produsele care au o singura marime (marime universala)
                          se potrivesc de obicei de la S (55 cm) la L (58 cm)
                        </li>
                      </ul>
                    </p>
                    <table className={classes.sizesTable}>
                      <tr>
                        <th>Mărime</th>
                        <td>53</td>
                        <td>54</td>
                        <td>55</td>
                        <td>56</td>
                        <td>57</td>
                        <td>58</td>
                        <td>59</td>
                        <td>60</td>
                        <td>61</td>
                      </tr>
                      <tr>
                        <th>Circumferință</th>
                        <td>53</td>
                        <td>54</td>
                        <td>55</td>
                        <td>56</td>
                        <td>57</td>
                        <td>58</td>
                        <td>59</td>
                        <td>60</td>
                        <td>61</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </TabPanel>
            </SwipeableViews>
          </DialogContent>
        </Dialog>
      )}
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
