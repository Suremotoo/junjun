import mysql from "mysql2/promise";
import { loadConfig } from "../config/config";
const configJSON = loadConfig();
// console.log("configJSON", configJSON);
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
let dbConfig = configJSON && configJSON.db ? configJSON.db : undefined;
if (!dbConfig) {
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  };
}
const db = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port ? dbConfig.port : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { db };
