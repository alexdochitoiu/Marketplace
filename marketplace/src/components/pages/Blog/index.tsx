import Head from "src/components/generic/Head";
import TitleBanner from "src/components/generic/TitleBanner";
import BlogCard from "./BlogCard";
import blogImg1 from "../../../assets/b1.jpg";
import concursImg from "../../../assets/concurs.jpg";

export default function () {
  return (
    <div style={{ background: "#eee", marginBottom: -30 }}>
      <Head
        title="Blog"
        description="Descopera o lume a elegantei si rafinamentului, a ultimelor tendinte
        in moda si a materialelor pretioase. Fie că preferi un stil relaxat, sau unul elegant, 
        vei găsi un accesoriu potrivit în selecția noastră de articole de blană sau, de ce nu, 
        chiar o haină de blană care să îți îmbogățească garderoba."
        image="https://miral-fashion.ro:4000/public/images/1636700451137miral-fashion-esarfa-din-blana-naturala-de-vizon-nurca-neagra.jpg"
        url="https://miral-fashion.ro/blog"
      />
      <TitleBanner title="Blog" />
      <div className="container" style={{ paddingBottom: 1 }}>
        <div
          className="flex-row"
          style={{ margin: 15, justifyContent: "space-around" }}
        >
          <BlogCard
            imageSrc={blogImg1}
            title="Articole de sezon de care ai nevoie"
            description="Sezonul rece ne bate la ușă, deși iarna și zăpada se lasă îndelung
              așteptate, prioritar este în continuare să avem parte de tot
              confortul termic.
              Iarna aceasta, propunerea Miral Fashion este atât pentru a-ți
              oferi un plus de confort, cât și pentru a-ți da o notă de eleganță
              și rafinament.
              "
            href="/blog/articole-de-sezon-de-care-ai-nevoie"
          />
          {/* <BlogCard
            imageSrc={concursImg}
            title="Regulament concurs"
            description="Orice persoană care dorește să se înscrie și ulterior să revendice premium, 
            dacă este cazul, trebuie să respecte următoarele condiții, pe lângă cele de participare de la art. 5:
            "
            href="/blog/regulament-concurs"
          /> */}
          <BlogCard
            imageSrc="https://miral-fashion.ro:4000/public/images/1638435123160miral-fashion-caciula-blana-argintie.jpg"
            title="Întreținerea hainelor și accesoriilor din blană"
            description="Blana este un material natural, organic, care nu va ține o veșnicie fără o îngrijire propice. 
            Pentru a le prelungi viața și a le păstra aspectul, 
            acestea trebuie depozitate corespunzător atunci când nu sunt purtate."
            href="/blog/intretinerea-hainelor-din-blana"
          />
        </div>
      </div>
    </div>
  );
}
