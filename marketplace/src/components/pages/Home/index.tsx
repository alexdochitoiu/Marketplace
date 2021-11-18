import { Helmet } from "react-helmet";
import Head from "src/components/generic/Head";
import "./Home.styles.css";
import ImageSlider from "./ImageSlider";
import SelectYourProduct from "./SelectYourProduct";
import ShippingInfo from "./ShippingInfo";
import TopProducts from "./TopProducts";

export default function () {
  return (
    <div>
      <Head
        title="Haine si caciuli din blana naturala"
        description="Miral-Fashion.ro iti ofera haine de blana naturala, caciuli din blana naturala, cape si etole, cojoace precum si accesorii din blana"
        image="https://miral-fashion.ro:4000/public/images/1636700451137miral-fashion-esarfa-din-blana-naturala-de-vizon-nurca-neagra.jpg"
        url="https://miral-fashion.ro/"
      />
      <ImageSlider />
      <TopProducts />
      <ShippingInfo />
      <SelectYourProduct />
    </div>
  );
}
