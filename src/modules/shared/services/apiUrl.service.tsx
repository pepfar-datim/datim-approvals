import testConfig from "../../../config/serverConfig.test.json";
import developmentConfig from "../../../config/serverConfig.dev.json";
import productionConfig from "../../../config/serverConfig.prod.json";

let config;

switch (process.env.NODE_ENV){
    case "production": config = productionConfig; break;
    case "test": config = testConfig; break;
    case "development": config = developmentConfig; break;
    default: config = developmentConfig; break;
}

if (!config) config = require("../../../config/serverConfig.dev.json");

export const baseUrl = config.baseUrl;
export const apiVersion = config.apiVersion;
