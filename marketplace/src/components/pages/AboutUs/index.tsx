import Head from "src/components/generic/Head";
import TitleBanner from "src/components/generic/TitleBanner";
import aboutUs from "../../../assets/about_us.jpeg";
import "./style.css";

export default function () {
  return (
    <div style={{ background: "#eee", marginBottom: -30 }}>
      <Head
        title="Despre noi"
        description="Descopera o lume a elegantei si rafinamentului, a ultimelor tendinte
        in moda si a materialelor pretioase."
        image="https://miral-fashion.ro:4000/public/images/1636700451137miral-fashion-esarfa-din-blana-naturala-de-vizon-nurca-neagra.jpg"
        url="https://miral-fashion.ro/despre-noi"
      />
      <TitleBanner title="Despre noi" />
      <div className="container about_us">
        <img
          src={aboutUs}
          height={600}
          alt="Miral-Fashion.ro - Haine si caciuli din blana naturala pentru femei si barbati"
        />
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
