export default interface ICategory {
  _id: string;
  title: string;
  section: "men" | "women" | "kids" | "other";
  active: boolean;
  description?: string;
  image?: string;
}
