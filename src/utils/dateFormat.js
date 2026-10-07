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
function parseConnectedAt(connectedAt) {
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
