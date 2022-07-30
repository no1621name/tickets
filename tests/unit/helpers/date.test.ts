import { formatDate } from '../../../src/ts/helpers/date';

describe('formatDate', () => {
  it('Check correct format', () => {
    expect(formatDate('Wed Jul 20 2022 20:40:01 GMT+0300 (Москва, стандартное время)', 'yyyy')).toBe('2022');
    expect(formatDate('2022-07-21T00:20:00+03:00', 'dd MMM yyyy hh:mm')).toBe('21 Jul 2022 12:20');
    expect(formatDate('2022-07-22T13:00:47Z', 'dd MM yy hh')).toBe('22 07 22 04');
  })
  it('Check incorrect format', () => {
    //@ts-ignore
    expect(formatDate(123, {})).toBe('');
  })
})