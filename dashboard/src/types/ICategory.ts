export default interface ICategory {
  _id: string;
  title: string;
  section: "men" | "women" | "kids" | "other";
  description?: string;
  image?: string;
}
