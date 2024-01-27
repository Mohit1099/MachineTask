import mongoose from "mongoose";
import {
  MONGO_PORT,
  MONGO_HOST,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD,
} from "../config/secret";

const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;


/**
 * The function establishes a connection to a database using the provided connection string and
 * authentication credentials.
 */
export const dbConnection = async (): Promise<any> => {
  try {
    const connection = await mongoose.connect(connectionString, {
      ssl: false,
      authSource: 'admin',
    });
    console.info("Database connected ", { connection });
  } catch (error) {
    console.error("Database connection failed", { error });
  }
}

export const disconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.info("Database disconnected", "disconnect");
  } catch (error) {
    console.error("Database disconnection failed", "disconnect", { error });
  }
}