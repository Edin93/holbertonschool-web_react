import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('getCurrentYear', () => {
  it('returns the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(getCurrentYear()).toBe(currentYear);
  });
});

describe('getFooterCopy', () => {
  it('returns the footer copy for the index page', () => {
    const isIndex = true;
    const footerCopy = getFooterCopy(isIndex);
    expect(footerCopy).toEqual(expect.stringMatching(/holberton school/i));
  });

  it('returns the footer copy for non-index pages', () => {
    const isIndex = false;
    const footerCopy = getFooterCopy(isIndex);
    expect(footerCopy).toEqual(expect.stringMatching(/holberton School main dashboard/i));
  });
});

describe('getLatestNotification', () => {
  it('returns the latest notification', () => {
    const latestNotification = getLatestNotification();
    expect(latestNotification).toEqual(expect.stringMatching(
      /<strong>Urgent requirement<\/strong> - complete by EOD/i)
    );
  });
});
