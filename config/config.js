import fs from "fs";
const os = require("os");
const userHomeDirectory = os.homedir();
console.log("User home directory:", userHomeDirectory);

export function loadConfig() {
  const customConfigPath = userHomeDirectory + "/junjun.json";
  const config = fs.readFileSync(customConfigPath);
  return JSON.parse(config);
}