import Head from "src/components/generic/Head";
import TitleBanner from "src/components/generic/TitleBanner";
import "./style.css";

export default function () {
  return (
    <div style={{ background: "#eee", marginBottom: -30 }}>
      <Head
        title="Blog - Întreținerea hainelor și accesoriilor din blană"
        description="Descopera o lume a elegantei si rafinamentului, a ultimelor tendinte
        in moda si a materialelor pretioase. Fie că preferi un stil relaxat, sau unul elegant, 
        vei găsi un accesoriu potrivit în selecția noastră de articole de blană sau, de ce nu, 
        chiar o haină de blană care să îți îmbogățească garderoba."
        image="https://miral-fashion.ro:4000/public/images/1636700451137miral-fashion-esarfa-din-blana-naturala-de-vizon-nurca-neagra.jpg"
        url="https://miral-fashion.ro/blog"
      />
      <TitleBanner title="Întreținerea hainelor și accesoriilor din blană" />
      <div className="container blog">
        <div className="blog-p">
          <div style={{ margin: 10, width: "100%" }}>
            <p>
              Dacă printre achizițiile tale din ultima perioadă se află și{" "}
              <a href="https://miral-fashion.ro/produse/61961bfa31fc1681f7e35cd6">
                haine de blană
              </a>
              , veste sau accesorii cum ar fi căciuli și fesuri, iată câteva
              indicii despre cum să ai mai bine grijă de ele.
            </p>
            <p>
              Blana este un material natural, organic, care nu va ține o
              veșnicie fără o îngrijire propice. Pentru a le prelungi viața și a
              le păstra aspectul, acestea trebuie depozitate corespunzător
              atunci când nu sunt purtate. Condiții ca umiditatea și prezența în
              exces a luminii vor usca blana și o vor face să pară ternă în
              timp.
            </p>
          </div>
        </div>
        <div className="blog-p">
          <a
            className="blog-a-img"
            style={{ height: 300 }}
            href="https://miral-fashion.ro/produs/61a888de54495488031cfccb"
          >
            <img
              width="100%"
              src="https://miral-fashion.ro:4000/public/images/1638435123160miral-fashion-caciula-blana-argintie.jpg"
            />
          </a>
          <div style={{ margin: 10 }}>
            <p>
              Produsele din blană naturală nedepozitate și îngrijite
              corespunzător, își vor schimba culoarea dacă nu sunt protejate, de
              aceea este recomandat ca pe perioada verii să fie depozitate
              într-un spațiu răcoros, fără lumină directă, de preferat acoperite
              cu un material din fibră naturală de bumbac.
            </p>
            <p>
              Atenție, produsele din blană nu se depozitează în pungi din
              plastic, acestea având nevoie de ventilație.
            </p>
            <p>
              Pe lângă păstrarea în condiții optime, curățarea produselor din
              blană se face de către personal specializat, cu produse care vor
              restaura nivelul optim de uleiuri din piele și vor reda
              strălucirea blănii.
            </p>
            <p>
              Nu recomandăm curățarea blănii acasă, folosind soluții din comerț,
              rețineți că blana este un produs natural, care necesită îngrijire
              specială.
            </p>
          </div>
        </div>

        <div className="blog-p">
          <a
            className="blog-a-img"
            style={{ height: 300 }}
            href="https://miral-fashion.ro/produs/61961e9f31fc1681f7e35d11"
          >
            <img
              width="100%"
              src="https://miral-fashion.ro:4000/public/images/1637228191426miral-fashion-haina-din-blana-de-nurca-grena-3.jpg"
            />
          </a>
          <div style={{ margin: 10 }}>
            <p>
              Poartă o eșarfă la gât dacă porți machiaj în combinație cu o haină
              de blană, aceasta va asigura protecția hainei de blană pentru ca
              tu să te poți bucura de ea cât mai mult timp.
            </p>
            <p>
              Perierea blănii se poate face cu o perie specială din cașmir, care
              îți va permite să îndepărtezi praful și să redai o formă unitară
              blănii.
            </p>
            <p>
              Pentru protecție pe termen îndelungat împotriva moliilor, dar și
              pentru a îndepărta mirosurile neplăcute, în comerț există soluții
              speciale pentru blană, cu arome subtile de cedru sau lavandă,
              trebuie doar să ai grijă să nu le folosești în exces.
            </p>
            <p>
              Sperăm că sfaturile noastre ți-au fost de folos și că te vei
              bucura de{" "}
              <a href="https://miral-fashion.ro/produse/61961bfa31fc1681f7e35cd6">
                haina sau accesoriile
              </a>{" "}
              tale cât mai mult timp!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
