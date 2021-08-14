import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "https://picsum.photos/id/1/1304/504" },
  { url: "https://picsum.photos/id/11/1304/504" },
  { url: "https://picsum.photos/id/12/1304/504" },
  { url: "https://picsum.photos/id/111/1304/504" },
];

export default function () {
  return (
    <SimpleImageSlider
      width="100%"
      height={504}
      images={images}
      showBullets={true}
      showNavs={true}
    />
  );
}
