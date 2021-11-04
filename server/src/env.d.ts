declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development";
    PORT: string;
    JWT_SECRET_KEY: string;
    NOTIFICATION_EMAIL: string;
    DASHBOARD_EMAIL: string;
    DASHBOARD_USER: string;
    DASHBOARD_PASSWORD: string;
    BRAND_NAME: string;
  }
}
