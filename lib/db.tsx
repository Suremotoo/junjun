import mysql from "mysql2/promise";
import { loadConfig } from "../config/config";
const configJSON = loadConfig();
// console.log("configJSON", configJSON);
const dbConfig = configJSON.db;
const db = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { db };
