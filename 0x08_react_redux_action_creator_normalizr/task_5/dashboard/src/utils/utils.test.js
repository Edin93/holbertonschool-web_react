import { getFooterCopy, getFullYear, getLatestNotification } from './utils';
import { StyleSheetTestUtils } from 'aphrodite';

describe("Utils functions", () => {

	beforeEach(() => {
		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	});

	test("getFullYear returns the correct year", () => {
		expect(getFullYear()).toEqual(2021);
	});

	test("getFooterCopy returns the correct string when the argument is true", () => {
		expect(getFooterCopy(true)).toEqual("Holberton School");
	});

	test("getFooterCopy returns the correct string when the argument is false", () => {
		expect(getFooterCopy(false)).toEqual("Holberton School main dashboard");
	});

	test("getLatestNotification returns the expected string", () => {
		expect(getLatestNotification()).toEqual("<strong>Urgent requirement</strong> - complete by EOD");
	});

});
