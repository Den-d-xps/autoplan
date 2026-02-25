import path from "path";
import os from "os";

const baseDir = process.env.APPDATA
    ? path.join(process.env.APPDATA, "autoplan")
    : path.join(os.homedir(), ".autoplan");

export const PATHS = {
    BASE_DIR: baseDir,
    PROFILE_DIR: path.join(baseDir, "profile"),
    AUTH_FILE: path.join(baseDir, "auth.json"),
};