declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET_KEY: string;
    DASHBOARD_EMAIL: string;
    DASHBOARD_USER: string;
    DASHBOARD_PASSWORD: string;
    MARKETPLACE_URL: string;
    BRAND_NAME: string;
  }
}
