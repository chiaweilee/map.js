interface Config {
  googleMapApiKey?: string;
  bingMapApiKey?: string;
}

const config: Config = {};

function setConfig(conf: Config) {
  Object.assign(config, conf);
}

export { config, setConfig };
