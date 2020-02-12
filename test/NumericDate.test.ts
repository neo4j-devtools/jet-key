import { dateToNumericDate, millisecondsToNumericDate, momentToNumericDate } from '../src';
import moment from 'moment';

describe('NumericDate converters', () => {
  it('can convert from js Date', () => {
    const now = new Date();
    expect(dateToNumericDate(now)).toEqual(Math.floor(now.getTime() / 1000));
  });

  it('can convert from milliseconds', () => {
    const now = new Date();
    const millis = now.getTime();
    expect(dateToNumericDate(now)).toEqual(millisecondsToNumericDate(millis));
  });

  it('can convert from moment datetime', () => {
    const d = new Date();
    const m = moment(d);
    expect(momentToNumericDate(m)).toEqual(dateToNumericDate(d));
  });
});
