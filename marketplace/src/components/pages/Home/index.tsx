import "./Home.styles.css";
import ImageSlider from "./ImageSlider";
import ShippingInfo from "./ShippingInfo";
import TopProducts from "./TopProducts";

export default function () {
  return (
    <div>
      <ImageSlider />
      <TopProducts />
      <ShippingInfo />
    </div>
  );
}
