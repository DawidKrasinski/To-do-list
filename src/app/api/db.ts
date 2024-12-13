import mysql from "mysql2/promise";
let dbConnection: mysql.Connection | null = null;
export async function getDB() {
  if (dbConnection) {
    return dbConnection;
  }

  try {
    if (!process.env.DB_HOST) {
      throw new Error("Missing DB_HOST environment variables");
    }
    if (!process.env.DB_USER) {
      throw new Error("Missing DB_USER environment variables");
    }
    if (!process.env.DB_PASSWORD) {
      throw new Error("Missing DB_PASSWORD environment variables");
    }
    if (!process.env.DB_DATABASE) {
      throw new Error("Missing DB_DATABASE environment variables");
    }
    if (!process.env.DB_PORT) {
      throw new Error("Missing DB_PORT environment variables");
    }
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT),
    });
    console.log("Database connection created");
    dbConnection = connection;
    return connection;
  } catch (error) {
    console.log("Error connecting to database", error);
    return null;
  }
}
