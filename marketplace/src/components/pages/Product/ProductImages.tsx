import ImageGallery from "react-image-gallery";
interface IProps {
  images: string[];
}

export default function ({ images }: IProps) {
  const items = images.map((i) => ({
    original: i,
    thumbnail: i,
    originalWidth: 600,
    originalHeight: 650,
    originalClass: "original-photo"
  }));
  return (
    <ImageGallery items={items} />
  );
}
