export const HOST =
  process.env.NODE_ENV === "production"
    ? "http://89.46.7.46:4000"
    : "http://localhost:4000";
export const MARKETPLACE_HOST =
  process.env.NODE_ENV === "production"
    ? "http://89.46.7.46"
    : "http://localhost";
