const currentYear = new Date().getFullYear();
const yearLimit = [0, 1, 2, 3, 4];
export const yearOptions = yearLimit.map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
