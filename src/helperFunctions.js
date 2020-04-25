export function countDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
