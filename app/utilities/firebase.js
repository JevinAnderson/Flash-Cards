import { isArray, isObject, isString } from './type-comparison';
import {} from './components';

const isKeyValid = key =>
  isString(key) && key.replace(/[\.#$\/\[\]]/g, '').trim();

export function sanitize(obj) {
  if (isObject(obj)) {
    const keys = Object.keys(obj);

    return keys.reduce((results, key) => {
      if (isKeyValid(key)) {
        const value = sanitize(obj[key]);

        if (value) {
          results[key] = value;
        }
      }

      return results;
    }, {});
  }

  if (isArray(obj)) {
    return undefined;
  }

  return obj;
}
