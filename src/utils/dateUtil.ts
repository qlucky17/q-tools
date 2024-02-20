/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format);
}

// 获取近n天的时间范围
export function getRecentDateRange(n, options = { timestamp: true, format: DATE_TIME_FORMAT }) {
  const endTime = dayjs().set('hour', 23).set('minute', 59).set('second', 59);
  const startTime = dayjs()
    .subtract(n - 1, 'day')
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0);
  if (options.timestamp) return [startTime.valueOf(), endTime.valueOf()];
  return [startTime.format(options.format), endTime.format(options.format)];
}

export function getRecentDateRangeFromTo(
  n,
  options = { timestamp: true, format: DATE_TIME_FORMAT }
) {
  const endTime = dayjs().set('hour', 23).set('minute', 59).set('second', 59);
  const startTime = dayjs()
    .subtract(n - 1, 'day')
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0);
  if (options.timestamp) return { from: startTime.valueOf(), to: endTime.valueOf() };
  return { from: startTime.format(options.format), to: endTime.format(options.format) };
}

export function getCurrMonthFromTo(options = { timestamp: true, format: DATE_TIME_FORMAT }) {
  if (options.timestamp)
    return {
      from: dayjs().startOf('month').valueOf(),
      to: dayjs().endOf('month').valueOf(),
    };
  return {
    from: dayjs().startOf('month').format(options.format),
    to: dayjs().endOf('month').format(options.format),
  };
}

export function getLastLastSevenDayFromTo(options: any) {
  if (options.timestamp)
    return {
      from: dayjs(options.stamp ? options.stamp : undefined)
        .subtract(7, 'day')
        .startOf('day')
        .valueOf(),
      to: dayjs(options.stamp ? options.stamp : undefined)
        .subtract(1, 'day')
        .endOf('day')
        .valueOf(),
    };
  return {
    from: dayjs(options.stamp ? options.stamp : undefined)
      .subtract(7, 'day')
      .startOf('day')
      .format(options.format),
    to: dayjs(options.stamp ? options.stamp : undefined)
      .subtract(1, 'day')
      .endOf('day')
      .format(options.format),
  };
}

export function getLastSevenDayFromTo(options: any) {
  if (options.timestamp)
    return {
      from: dayjs(options.stamp ? options.stamp : undefined)
        .subtract(6, 'day')
        .startOf('day')
        .valueOf(),
      to: dayjs(options.stamp ? options.stamp : undefined)
        .subtract(0, 'day')
        .endOf('day')
        .valueOf(),
    };
  return {
    from: dayjs(options.stamp ? options.stamp : undefined)
      .subtract(6, 'day')
      .startOf('day')
      .format(options.format),
    to: dayjs(options.stamp ? options.stamp : undefined)
      .subtract(0, 'day')
      .endOf('day')
      .format(options.format),
  };
}

export function getLastDaysFromTo(number, options: any) {
  if (options.timestamp)
    return {
      from: dayjs(options.stamp ? options.stamp : undefined)
        .subtract(number, 'day')
        .startOf('day')
        .valueOf(),
      to: dayjs(options.stamp ? options.stamp : undefined)
        .subtract(0, 'day')
        .endOf('day')
        .valueOf(),
    };
  return {
    from: dayjs(options.stamp ? options.stamp : undefined)
      .subtract(number, 'day')
      .startOf('day')
      .format(options.format),
    to: dayjs(options.stamp ? options.stamp : undefined)
      .subtract(0, 'day')
      .endOf('day')
      .format(options.format),
  };
}

export const dateUtil = dayjs;
