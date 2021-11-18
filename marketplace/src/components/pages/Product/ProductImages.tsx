import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

interface IProps {
  images: string[];
  title: string;
}

export default function ({ images, title }: IProps) {
  const items: ReactImageGalleryItem[] = images.map((i) => ({
    original: i,
    thumbnail: i,
    originalWidth: 600,
    originalHeight: 650,
    originalClass: "original-photo",
    originalAlt: title,
  }));
  return <ImageGallery items={items} />;
}
