import { config } from '../config';

export let Microsoft: any;
declare let window: any;
let loader: Promise<void>;

export function loadBingMapApi(key = config.bingMapApiKey): Promise<void> {
  if (typeof key !== 'string') {
    return Promise.reject();
  }

  // loaded
  if (window.Microsoft) {
    return Promise.resolve();
  }

  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const callbackName = '__bingAPIReady__';
      let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}&setLang=en`;
      if (key) {
        url += `&key=${key}`;
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = url;
      window[callbackName] = () => {
        Microsoft = window.Microsoft;
        window[callbackName] = null;
        document.body.removeChild(script);
        resolve();
      };
      script.onerror = (error: any) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  return loader;
}
