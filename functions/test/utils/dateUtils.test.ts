import {dateToFormattedDayMonth, getJoinedDateAsString, getTimestamp,
     isToday, getDate, addDays, getEndOfDay, getStartOfDay, getCurrentTimestamp} from "../../src/utils/dateUtils";
import {expect} from 'chai';

describe('dateUtils tests', () => {
    it('should convert timestamp to day and month with leading 0', () => {
        const dateString = dateToFormattedDayMonth(new Date(1610112455 * 1000));

        expect(dateString).to.be.eq("08.01");
    });

    it('should convert timestamp to day and month without leading 0', () => {
        const dateString = dateToFormattedDayMonth(new Date(1606712455 * 1000));

        expect(dateString).to.be.eq("30.11");
    });

    it('should convert date to oneline date with leading zeros', () => {
        process.env.TZ = 'Europe/Warsaw';
        const dateString = getJoinedDateAsString(new Date(1615161642 * 1000));
        expect(dateString).to.be.eq("20210308");
    });

    it('should convert date to oneline date without leading zeros', () => {
        process.env.TZ = 'Europe/Warsaw';
        const dateString = getJoinedDateAsString(new Date(1639785642 * 1000));
        expect(dateString).to.be.eq("20211218");
    });

    it('should create timestamp as integer', () => {
        process.env.TZ = 'Europe/Warsaw';
        const date = new Date(1639785643.123 * 1000);
        const dateString = getTimestamp(date);
        expect(dateString).to.be.eq(1639785643);
    });

    it('should check that date is today', () => {
        process.env.TZ = 'Europe/Warsaw';
        const date = new Date();
        const isTodayValue = isToday(date);
        expect(isTodayValue).to.be.eq(true);
    });

    it('should check that date is not today', () => {
        process.env.TZ = 'Europe/Warsaw';
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const isTodayValue = isToday(date);
        expect(isTodayValue).to.be.eq(false);
    });

    it('should be able to create date object from timestamp', () => {
        process.env.TZ = 'GMT';
        const expected_date = new Date(1970,0,1); 
        const actual_date = getDate(0);
        expect(actual_date).to.be.instanceOf(Date);
        expect(actual_date).to.be.deep.eq(expected_date);
    });

    it ('should add days to date', () => {
        process.env.TZ = 'GMT';
        const work_date = new Date(1970, 0, 15); // 15th January 1970
        const expected_plus_5_days = new Date(1970, 0, 20); // 20th January 1970
        const expected_minus_5_days = new Date(1970, 0, 10); // 10th January 1970

        const actual_plus_5_days = addDays(work_date, 5);
        const actual_minus_5_days = addDays(work_date, -5);

        expect(actual_plus_5_days).to.be.instanceOf(Date);
        expect(actual_plus_5_days).to.be.deep.eq(expected_plus_5_days);

        expect(actual_minus_5_days).to.be.instanceOf(Date);
        expect(actual_minus_5_days).to.be.deep.eq(expected_minus_5_days);

    });

    it ('should return start of day', () => {
        process.env.TZ = 'GMT';
        const work_date = new Date(1970, 0, 0, 15, 30); // 1st January 1970 15:30 arbitrary non-zero time
        const expected_start_of_day = new Date(1970, 0, 0); // 1st January 1970 00:00
        const actual_start_of_day = getStartOfDay(work_date);

        expect(actual_start_of_day).to.be.instanceOf(Date);
        expect(actual_start_of_day).to.be.deep.eq(expected_start_of_day);
    });

    it ('should return end of day', () => {
        process.env.TZ = 'GMT';
        const work_date = new Date(1970, 0, 0, 15, 30); // 1st January 1970 15:30 arbitrary non-zero time
        const expected_end_of_day = new Date(1970, 0, 0, 23, 59, 59, 999); // 1st January 1970 23:59:59.999
        const actual_end_of_day = getEndOfDay(work_date);

        expect(actual_end_of_day).to.be.instanceOf(Date);
        expect(actual_end_of_day).to.be.deep.eq(expected_end_of_day);
    });

    // Almost useless test as we do not test it's actual value
    it ('call current time stamp', () => {
        const actual = getCurrentTimestamp();
        expect(actual).to.be.a('number');
    });

});
