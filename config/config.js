'use server'

import fs from "fs";
const os = require("os");
const userHomeDirectory = os.homedir();
console.log("User home directory:", userHomeDirectory);

export async function loadConfig() {
  const customConfigPath = userHomeDirectory + "/junjun.json";
  try {
    const config = fs.readFileSync(customConfigPath);
    return JSON.parse(config);
  } catch (error) {
    return null;
  }
}
