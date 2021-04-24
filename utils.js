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
  'jaipur'
];

export function capitalCase(string) {
  if (!string) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1);
}

export const STORAGE_KEY = {
  generated_links: 'generated_links',
};

export const LocalStorage = {
  /**
   *
   * @param key
   * @param value
   * @returns {*}
   */
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {}

    return value;
  },

  /**
   *
   * @param key
   * @param defaultValue
   * @returns {any}
   */
  getItem: (key, defaultValue) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null || typeof value === "undefined") {
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (e) {}

    return defaultValue;
  },

  /**
   *
   * @param key
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
}
