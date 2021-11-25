import Head from "src/components/generic/Head";
import TitleBanner from "src/components/generic/TitleBanner";
import blogImg1 from "../../../assets/b1.jpg";
import blogImg2 from "../../../assets/b2.jpg";
import "./style.css";

export default function () {
  return (
    <div style={{ background: "#eee", marginBottom: -30 }}>
      <Head
        title="Blog - Articolele de sezon de care ai nevoie"
        description="Descopera o lume a elegantei si rafinamentului, a ultimelor tendinte
        in moda si a materialelor pretioase. Fie că preferi un stil relaxat, sau unul elegant, 
        vei găsi un accesoriu potrivit în selecția noastră de articole de blană sau, de ce nu, 
        chiar o haină de blană care să îți îmbogățească garderoba."
        image="https://miral-fashion.ro:4000/public/images/1636700451137miral-fashion-esarfa-din-blana-naturala-de-vizon-nurca-neagra.jpg"
        url="https://miral-fashion.ro/blog"
      />
      <TitleBanner title="Articolele de sezon de care ai nevoie" />
      <div className="container blog">
        <img
          src={blogImg1}
          width="100%"
          alt="Miral-Fashion.ro - Haine si caciuli din blana naturala pentru femei si barbati"
        />
        <div className="blog-p">
          <a
            className="blog-a-img"
            style={{ height: 300 }}
            href="https://miral-fashion.ro/produse/61961bfa31fc1681f7e35cd6"
          >
            <img
              width="100%"
              src="https://miral-fashion.ro:4000/public/images/1637227762123miral-fashion-haina-blana-chinchilla-piele-gri-deschis-2.jpg"
            />
          </a>
          <div style={{ margin: 10 }}>
            <p>
              Sezonul rece ne bate la ușă, deși iarna și zăpada se lasă îndelung
              așteptate, prioritar este în continuare să avem parte de tot
              confortul termic.
            </p>
            <p>
              Iarna aceasta, propunerea Miral Fashion este atât pentru a-ți
              oferi un plus de confort, cât și pentru a-ți da o notă de eleganță
              și rafinament.
            </p>
            <p>
              Fie că preferi un stil relaxat, sau unul elegant, vei găsi un
              accesoriu potrivit în selecția noastră de articole de blană sau,
              de ce nu, chiar o{" "}
              <a href="https://miral-fashion.ro/produse/61961bfa31fc1681f7e35cd6">
                haină de blană
              </a>{" "}
              care să îți îmbogățească garderoba.
            </p>
          </div>
        </div>

        <div className="blog-p">
          <div style={{ margin: 10 }}>
            <p>
              Pentru un look relaxat, cel mai potrivit accesoriu din blană
              naturală este fesul. Atent confecționat din tricot elastic pe care
              sunt cusute fâșii de blană naturală de vulpe sau nurcă, un{" "}
              <a href="https://miral-fashion.ro/produs/618f8c26ca859449314861b4">
                fes cu urechi
              </a>{" "}
              va fi alegerea potrivită pentru o ținută trendy. În același timp,
              un{" "}
              <a href="https://miral-fashion.ro/produs/618e9b54ca85944931484caf">
                fes simplu
              </a>
              , din blană naturală de vulpe polară, se va potrivi oricărei
              ținute zilnice.
            </p>
            <p>
              <a href="https://miral-fashion.ro/produs/618e9af5ca85944931484c93">
                Alb
              </a>
              ,{" "}
              <a href="https://miral-fashion.ro/produs/618f7de5ca85944931485d2d">
                verde
              </a>
              , roșu sau{" "}
              <a href="https://miral-fashion.ro/produs/618f7daeca85944931485d1f">
                albastru
              </a>
              , indiferent de culorile preferate, fesurile Miral Fashion se vor
              potrivi stilului tău vestimentar de fiecare dată.
            </p>
          </div>
          <a
            className="blog-a-img"
            href="https://miral-fashion.ro/produse/61961bfa31fc1681f7e35cd6"
            style={{ height: 250 }}
          >
            <img width="100%" src={blogImg2} />
          </a>
        </div>

        <div className="blog-p">
          <a
            className="blog-a-img"
            href="https://miral-fashion.ro:4000/public/images/1636736372553miral-fashion-caciula-din-blana-naturala-de-vulpe-polara-si-piele-verde.jpg"
            style={{ height: 210 }}
          >
            <img
              width="100%"
              style={{ minWidth: 270 }}
              src="https://miral-fashion.ro:4000/public/images/1636736372553miral-fashion-caciula-din-blana-naturala-de-vulpe-polara-si-piele-verde.jpg"
            />
          </a>
          <div style={{ margin: 10 }}>
            <p>
              Tot ținutelor relaxate, poți asorta o{" "}
              <a href="https://miral-fashion.ro/produse/618d3e4bc2c25521648dff8f">
                căciulă din blană naturală și piele, cu urechi
              </a>
              . Aceste căciuli sunt create special pentru a-ți oferi un maxim de
              protecție și confort termic, fără a sacrifica frumusețea. Pune-ți
              în valoare stilul personal alegând o căciulă din{" "}
              <a href="https://miral-fashion.ro/produs/618e5a20ca85944931483c48">
                blană naturală de vulpe polară
              </a>{" "}
              într-o culoare neutră de bej, sau ieși din zona de confort cu o
              culoare electrizantă de{" "}
              <a href="https://miral-fashion.ro/produs/618e9d2dca85944931484cd6">
                verde
              </a>
              .
            </p>
          </div>
        </div>

        <div className="blog-p">
          <div style={{ margin: 10 }}>
            <p>
              Să nu uităm nici de{" "}
              <a href="https://miral-fashion.ro/produse/618bfa82e7959a8f2324f250">
                clasicele căciuli din blană
              </a>
              . Confecționate din blană de vulpe sau nurcă, cu interior
              confortabil din material satinat matlasat și cu posibilitate de
              ajustare, căciulile clasice nu trebuie să lipsească iarna aceasta
              din garderoba ta.
            </p>
          </div>
          <a
            className="blog-a-img"
            href="https://miral-fashion.ro:4000/public/images/1636715761866miral-fashion-esarfa-din-blana-naturala-de-vizon-gri-inchis-2.jpg"
            style={{ height: 210 }}
          >
            <img
              width="100%"
              src="https://miral-fashion.ro:4000/public/images/1636715761866miral-fashion-esarfa-din-blana-naturala-de-vizon-gri-inchis-2.jpg"
            />
          </a>
        </div>

        <div className="blog-p">
          <a
            className="blog-a-img"
            href="https://miral-fashion.ro:4000/public/images/1636734152435miral-fashion-caciula-clasica-din-blana-naturala-de-vizon-nurca-tip-bereta-neagra.jpg"
          >
            <img
              width="100%"
              style={{ height: 210 }}
              src="https://miral-fashion.ro:4000/public/images/1636734152435miral-fashion-caciula-clasica-din-blana-naturala-de-vizon-nurca-tip-bereta-neagra.jpg"
            />
          </a>
          <div style={{ margin: 10 }}>
            <p>
              Adaugă-le la ținute lejere, de zi, sau ieși din anonimat alegând o{" "}
              <a href="https://miral-fashion.ro/produs/618e94a4ca85944931484a54">
                căciulă în formă de beretă
              </a>{" "}
              la care poți asorta și o haină de blană.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
