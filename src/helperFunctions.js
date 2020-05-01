export function countDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export function addZ(n) {
  return n < 10 ? `0${n}` : `${n}`;
}
