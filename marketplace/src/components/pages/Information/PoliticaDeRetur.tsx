import TitleBanner from "src/components/generic/TitleBanner";
import { MAIL } from "src/constants/contact";

export default function () {
  return (
    <div>
      <TitleBanner title="Politica de retur" />
      <div className="terms_and_cond_content container info_container">
        <h4>Politica retur</h4>
        <p>
          Produsele achiziționate de pe site-ul nostru pot fi returnate în
          termen de 14 zile de la momentul livrării.
          <br />
          <br />
          Condiții pentru acceptarea returului:
          <br />
          <br />
          - eticheta produsului nu trebuie să fie dezlipită sau ruptă;
          <br />
          - produsul nu trebuie să prezintă urme de uzură sau folosință de orice
          fel;
          <br />
          - taxa de transport pentru retur se achită de client; <br />
          <br />
          Returul produselor se poate face astfel:
          <br />
          - prin schimb cu un alt produs/mărime;
          <br />
          - modificare/reparare produs;
          <br />
          - contravaloare în bani a sumei achitate (fără taxele de transport).
          <br />
          <br />
          Contravaloarea produselor va fi achitată prin virament bancar, în
          contul furnizat de client, în termen de 15 zile de la constatarea că
          returul îndeplinește condițiile necesare.
          <br />
          Pentru a iniția returul unui produs, vă rugăm să trimiteți un e-mail
          la adresa <a href={`mailto:${MAIL}`}>{MAIL}</a>, care să conțină
          următoarele informații:
          <br />
          - Nume și Prenume
          <br />
          - Telefon
          <br />
          - Data achiziției și factură
          <br />
          - Tipul de retur solicitat
          <br />
          - Contul bancar în cazul în care se solicită contravaloarea
          produselor.
          <br />
        </p>
      </div>
    </div>
  );
}
