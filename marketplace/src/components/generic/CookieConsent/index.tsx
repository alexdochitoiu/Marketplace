import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import React from "react";
import CookieConsent from "react-cookie-consent";
import { GrClose } from "react-icons/gr";
import ReactPixel from "src/ReactPixel";

const useStyles = makeStyles({
  root: {
    background: "transparent !important",
    "& > span": {
      lineHeight: 1,
    },
  },
  label: { fontSize: 12, textTransform: "none", lineHeight: 1 },
  link: {
    fontWeight: "bold",
    color: "#555",
    "&:hover": {
      color: "var(--primary)",
    },
  },
  title: {
    position: "relative",
    padding: 20,
    fontSize: 24,
    textAlign: "center",
    color: "var(--primary)",
    background: "#f0f0f0",
  },
  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    right: 15,
    top: 15,
    stroke: "#444",
    background: "#fff",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      "& > path": {
        stroke: "#fff",
      },
      background: "var(--primary)",
    },
  },
  detailsBtn: {
    cursor: "pointer",
    padding: "0 5px",
    transition: "0.15s all ease-in-out",
    "&:hover": {
      background: "#fff",
      color: "var(--primary)",
    },
  },
});

export default function () {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Acceptă"
        onAccept={ReactPixel.grantConsent}
        cookieName="cookie-consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ background: "var(--primary)", color: "#fff" }}
        expires={150}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          Miral-Fashion.ro folosește cookies doar pentru a îmbunătăți navigarea
          în magazinul online. Acestea nu conțin date personale.
          <span className={classes.detailsBtn} onClick={handleClick}>
            Detalii
          </span>
        </div>
      </CookieConsent>
      <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose}>
        <h4 className={classes.title}>
          <GrClose className={classes.closeIcon} onClick={handleClose} />
          Cookies
        </h4>
        <DialogContent
          style={{ borderTop: "1px solid #ddd" }}
          className="terms_and_cond_content"
        >
          <h4>Detalii funcționare cookies</h4>
          <p>
            Dacă lași un comentariu pe site-ul nostru, poți opta pentru salvarea
            în cookie-uri a numelui, adresei de email și site-ului tău web.
            Acestea sunt pentru confortul tău, astfel nu mai trebuie să le
            completezi din nou când lași un alt comentariu. Aceste cookie-uri
            vor fi salvate pe perioada unui an.
            <br />
            Dacă mergi la pagina noastră de autentificare, vom seta un cookie
            temporar pentru a determina dacă navigatorul tău acceptă cookie-uri.
            Acest cookie nu conține date personale și este eliminat când închizi
            navigatorul.
            <br />
            Când te autentifici în cont, vom seta și câteva cookie-uri pentru
            a-ți salva informațiile de autentificare și opțiunile de afișare pe
            ecran. Cookie-urile de autentificare sunt păstrate două zile, iar
            cele pentru opțiuni de afișare pe ecran sunt păstrate un an.
            <br />
            Dacă selectezi „Ține-mă minte”, cookie-urile tale de autentificare
            vor fi păstrate două săptămâni. Dacă ieși din cont, cookie-urile de
            autentificare vor fi eliminate.
          </p>
          <br />
          <h4>Procedura ștergere cookies</h4>
          <p>
            Dacă nu sunteți de acord cu utilizarea de cookies pe site-ul nostru,
            le puteți șterge, urmând pașii de mai jos.
            <br />
            Puteți de asemenea face setări, astfel încât browser-ul pe care îl
            utilizați să blocheze cookies sau să vă avertizeze cu o notificare
            înainte de stocarea de cookies. Dacă ștergeți cookies, este posibil
            să nu puteți utiliza o parte din serviciile de pe site-ul nostru.
            <br />
            Procedura de ștergere automată a cookies pentru Chrome este:
            <br />
            Click pe pictograma de meniu din colțul dreapta sus (sub formă de 3
            bare orizontale), selectați <b>Settings</b> {">"}{" "}
            <b>Show advanced settings</b> {">"} <b>Privacy</b> și apăsați pe
            Content settings.
            <br />
            În fereastra care se deschide, sub cookies, selectați butonul “Keep
            local data only until you quit your browser.”
            <br />
            Click pe Done în partea de jos a ferestrei.
            <br />
            Pentru alt browser sau pentru alte setări, găsiți informații și
            detalii pe numeroase site-uri.
            <br />
            Tagurile pixel adună date statistice de bază asupra folosirii
            site-ului și a reacțiilor, permițând numărarea vizitatorilor (în
            scop statistic), oferirea de servicii de brand și analizarea
            eficacității promoției și campaniilor de publicitate.
            <br />
            Miral Fashion LNT SRL poate revizui sau actualiza aceste condiții
            fără notificare prealabilă, în orice moment. Pentru a lua la
            cunoștință despre politica de cookie practicată, trebuie consultat
            site-ul nostru.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
