export const POPULAR_CITIES = [
  'delhi',
  'pune',
  'mumbai',
  'bangalore',
  'thane',
  'hyderabad',
  'nagpur',
  'lucknow',
  'ahmedabad',
  'chennai',
  'kolkata',
  'goa',
];

/**
 * A function which capitalises the first letter in a string 
 * @param {String} string - The input string
 * @returns {String|undefined}
 */
export function capitalCase(string) {
  if (!string) {
    return undefined;
  }

  if(typeof string !== 'string'){
    throw new TypeError(`Expected type "string" received type "${typeof string}"`);
  }

  return string[0].toUpperCase() + string.slice(1);
}

export const STORAGE_KEY = {
  generated_links: 'generated_links',
};

export const LocalStorage = {
  /**
   * A method used to set an item in localStorage
   * @param {any} key - The unique key
   * @param {any} value - The value mapping to this key 
   * @returns {any}
   */
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {}

    return value;
  },

  /**
   * A method used to get an item from localStorage
   * @param {any} key - The unique key
   * @param {any} defaultValue - The value to be retrurned if the value mapping to this key is undefined/null 
   * @returns {any}
   */
  getItem: (key, defaultValue) => {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (e) {}

    return defaultValue;
  },

  /**
   * A method used to remove an item from localStorage
   * @param {any} key - The unique key
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
}
