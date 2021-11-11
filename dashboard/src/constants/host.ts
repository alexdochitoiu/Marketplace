export const HOST =
  process.env.NODE_ENV === "production"
    ? "https://miral-fashion.ro:4000"
    : "http://localhost:4000";
export const MARKETPLACE_HOST =
  process.env.NODE_ENV === "production"
    ? "https://miral-fashion.ro"
    : "http://localhost";
