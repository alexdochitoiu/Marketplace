import TitleBanner from "src/components/generic/TitleBanner";
import aboutUs from "../../../assets/about_us.jpeg";
import "./style.css";

export default function () {
  return (
    <div style={{ background: "#eee", marginBottom: -30 }}>
      <TitleBanner title="Despre noi" />
      <div className="container about_us">
        <img src={aboutUs} height={600} />
        <div style={{ margin: 20 }}>
          <p>
            Descoperă o lume a eleganței și rafinamentului, a ultimelor tendințe
            în modă și a materialelor prețioase.
          </p>
          <p>
            Pasionată de frumos și alegeri scoase din tipare, echipa Miral
            Fashion îți pune la dispoziție cele mai noi modele de accesorii din
            blană naturală. Fie că alegi să porți o căciulă clasică, una cu
            urechi, fesuri, eșarfe elegante, sau chiar haine de blană, Miral
            Fashion îți aduce mereu ultimele apariții în domeniu disponibile pe
            piață.
          </p>
          <p>
            Comercializăm doar produsele din blană naturală care trec cele mai
            riguroase controale de calitate și selecționăm ceea ce știm că va fi
            pe placul clienților noștri și le va oferi acel plus de grație și
            distincție.
          </p>
          <p>
            Alege să porți produsele de la Miral Fashion, știm sigur că te vei
            bucura de experiența de lux.
          </p>
        </div>
      </div>
    </div>
  );
}
