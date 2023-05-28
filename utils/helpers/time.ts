/**
 * @param {number} n - number of weeks
 * @returns {number}
 * @returns The number of milliseconds in n weeks
 * @example weeks(1) // 604800000
 */

export const weeks = (n: number) => days(n * 7);

/**
 * @param {number} n - number of days
 * @returns {number}
 * @returns The number of milliseconds in n days
 * @example days(1) // 86400000
 *
 */

export const days = (n: number) => hours(n * 24);

/**
 * @param {number} n - number of hours
 * @returns {number}
 * @returns The number of milliseconds in n hours
 * @example hours(1) // 3600000
 */

export const hours = (n: number) => minutes(n * 60);

/**
 * @param {number} n - number of minutes
 * @returns {number}
 * @returns The number of milliseconds in n minutes
 * @example minutes(1) // 60000
 */

export const minutes = (n: number) => seconds(n * 60);

/**
 * @param {number} n - number of seconds
 * @returns {number}
 * @returns The number of milliseconds in n seconds
 * @example seconds(1) // 1000
 */

export const seconds = (n: number) => n * 1000;

/**
 * @param {number} seconds - number of seconds
 * @returns {string}
 * @returns The number of seconds in minutes and seconds format
 * @example secondsToMinutesFormat(60) // 1:00
 */

export const secondsToMinutesFormat = (seconds: number) => {
  const value = Math.floor(seconds);
  return (
    Math.floor(value / 60) +
    ":" +
    (value % 60 ? value % 60 : 0).toString().padStart(2, "0")
  );
};

/**
 *
 * @param seconds
 * @returns {string}
 * @returns The number of milliseconds in seconds format
 */

export const secondsToMilliseconds = (seconds: number) => {
  return Math.floor(seconds * 1000);
};

export const getStartOfTheDay = (dateString: string | Date) => {
  if (!dateString) {
    return undefined;
  }
  let date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};
