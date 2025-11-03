import path from "path";
import os from "os";


export const PATHS = {
  BASE_DIR: path.join(os.homedir(), ".autoplan"),
  PROFILE_DIR: path.join(os.homedir(), ".autoplan", "profile"),
  AUTH_FILE: path.join(os.homedir(), ".autoplan", "auth.json"),
};
