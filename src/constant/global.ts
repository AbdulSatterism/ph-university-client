export const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthName.map((month) => ({
  value: month,
  label: month,
}));

export const genders = ["male", "female", "others"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const weekDaysOptions = weekDays.map((item) => ({
  value: item,
  label: item,
}));
