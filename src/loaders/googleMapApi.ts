import { config } from '../config';

export function loadGoogleMapApi(key = config.googleMapApiKey): Promise<void> {
  if (typeof key !== 'string') {
    return Promise.reject();
  }

  // todo development
  return Promise.reject();
}
