import { getFooterCopy, getFullYear, getLatestNotification } from './utils';

describe("Utils functions", () => {
	
	test("getFullYear returns the correct year", () => {
		expect(getFullYear()).toEqual(2021);
	});

	test("getFooterCopy returns the correct string when the arg is true or false", () => {
		expect(getFooterCopy(true)).toEqual("Holberton School");
		expect(getFooterCopy(false)).toEqual("Holberton School main dashboard");
	});

	test("getLatestNotification returns the expected string", () => {
		expect(getLatestNotification()).toEqual("<strong>Urgent requirement</strong> - complete by EOD");
	});

});
