import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('getFullyYear', () => {
  it('returns the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(getCurrentYear()).toBe(currentYear);
  });
});

describe('getFooterCopy', () => {
  it('returns the footer copy for the index page', () => {
    const isIndex = true;
    const footerCopy = getFooterCopy(isIndex);
    expect(footerCopy).toBe('Holberton School');
  });

  it('returns the footer copy for non-index pages', () => {
    const isIndex = false;
    const footerCopy = getFooterCopy(isIndex);
    expect(footerCopy).toBe('Holberton School main dashboard');
  });
});

describe('getLatestNotification', () => {
  it('returns the latest notification', () => {
    const latestNotification = getLatestNotification();
    expect(latestNotification).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });
});
