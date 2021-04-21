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
];

export function capitalCase(string) {
  if (!string) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1);
}
