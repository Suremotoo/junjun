import fs from "fs";
const os = require("os");
const userHomeDirectory = os.homedir();
console.log("User home directory:", userHomeDirectory);

export function loadConfig() {
  const customConfigPath = userHomeDirectory + "/junjun.json";
  fs.access(customConfigPath, fs.constants.F_OK, (err) => {
    console.log(
      `${customConfigPath} ${
        err ? "not found junjun.json" : "found junjun.json"
      }`
    );
    if (err) return null;
    const config = fs.readFileSync(customConfigPath);
    return JSON.parse(config);
  });
}
