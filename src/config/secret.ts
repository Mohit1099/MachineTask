import { config as dotenvConfig } from "dotenv";
import constant from "./constant";

if (constant.LOCAL === "local") {
  dotenvConfig({ path: ".env" });
} else {
  dotenvConfig();
}

export const ENVIRONMENT = process.env.NODE_ENV;

export const APP_VERSION = process.env.npm_package_version;
export const APP_NAME = process.env.npm_package_name;
export const {
  MONGO_URI,
  MONGO_DATABASE,
  MONGO_PORT,
  MONGO_HOST,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  PORT,
  SWAGGER_URL,
  JWT_SECRET,
  JWT_EXPIRY,
  PRODUCT_URL
} = process.env;
