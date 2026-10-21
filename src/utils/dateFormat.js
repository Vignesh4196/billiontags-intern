export function parseDobToDate(value) {
  const [day, month, year] = value.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateToDob(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// "29/05/2002" -> "29 - May - 2002"
export function formatDobDisplay(value) {
  const date = parseDobToDate(value);
  return `${String(date.getDate()).padStart(2, '0')} - ${MONTHS[date.getMonth()].slice(0, 3)} - ${date.getFullYear()}`;
}

export function parseTimeTo24(value) {
  const [time, meridiem] = value.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function formatTimeTo12h(date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${meridiem}`;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function clock(date) {
  let hours = date.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${String(hours).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${meridiem}`;
}

// "October 29, 2024 at 03:22 AM"
export function formatLongDateTime(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${clock(date)}`;
}

// "Oct 29, 2024 at 03:22 AM"
export function formatShortDateTime(date) {
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()} at ${clock(date)}`;
}

// "Oct 29, 2024"
export function formatShortDate(date) {
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
}

// "May 12, 2022"
export function formatLongDate(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// connectedAt is an ISO string. A bare "2022-05-12" is read as a local date, not UTC midnight,
// so the day never shifts with the device's time zone.
export function parseConnectedAt(connectedAt) {
  if (!connectedAt) return null;
  const bare = /^(\d{4})-(\d{2})-(\d{2})$/.exec(connectedAt);
  const date = bare ? new Date(Number(bare[1]), Number(bare[2]) - 1, Number(bare[3])) : new Date(connectedAt);
  return Number.isNaN(date.getTime()) ? null : date;
}

const plural = (count, unit) => `${count} ${unit}${count === 1 ? '' : 's'}`;

// Whole years / months / days between two calendar dates (time of day ignored).
function calendarDiff(from, to) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

// "August 12, 2023" from an ISO date (e.g. when the user signed up), or '' when missing.
export function formatIsoLongDate(value) {
  const date = parseConnectedAt(value);
  return date ? formatLongDate(date) : '';
}

// "4 years, 5 months". Under a year it shows months, under a month days, and on the day itself "Today".
export function formatTogetherDuration(connectedAt, now = new Date()) {
  const date = parseConnectedAt(connectedAt);
  if (!date) return '';
  const { years, months, days } = date > now ? { years: 0, months: 0, days: 0 } : calendarDiff(date, now);
  if (years > 0) return months > 0 ? `${plural(years, 'year')}, ${plural(months, 'month')}` : plural(years, 'year');
  if (months > 0) return plural(months, 'month');
  return days === 0 ? 'Today' : plural(days, 'day');
}

// "May 12" (the yearly anniversary of connecting), or ''.
export function formatAnniversary(connectedAt) {
  const date = parseConnectedAt(connectedAt);
  return date ? `${MONTHS[date.getMonth()]} ${date.getDate()}` : '';
}

// Date -> "2023-08-15" (local date, no time zone shift).
export function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// "Aug 15 , 2023" (the spacing is the design's).
export function formatSpacedDate(date) {
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()} , ${date.getFullYear()}`;
}

// "May 12, 2022" (when the couple connected), or '' when not connected.
export function formatConnectedSince(connectedAt) {
  const date = parseConnectedAt(connectedAt);
  return date ? formatLongDate(date) : '';
}

// "Together since May 12, 2022 · 4 years 3 months". Under a year it shows months, under a
// month it shows days, and on the day of connecting it shows "Today". '' when not connected.
export function formatTogetherSince(connectedAt, now = new Date()) {
  const date = parseConnectedAt(connectedAt);
  if (!date) return '';
  const { years, months, days } = date > now ? { years: 0, months: 0, days: 0 } : calendarDiff(date, now);

  let duration;
  if (years > 0) duration = months > 0 ? `${plural(years, 'year')} ${plural(months, 'month')}` : plural(years, 'year');
  else if (months > 0) duration = plural(months, 'month');
  else duration = days === 0 ? 'Today' : plural(days, 'day');

  return `Together since ${formatLongDate(date)} · ${duration}`;
}

// Whole days from today until a label like "Nov 12, 2024" (negative once it has passed).
export function daysUntil(label, now = new Date()) {
  const target = new Date(label);
  if (Number.isNaN(target.getTime())) return Infinity;
  const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((startOfDay(target) - startOfDay(now)) / 86400000);
}

// Renewal opens this many days before the plan renews.
export const RENEW_WINDOW_DAYS = 10;
