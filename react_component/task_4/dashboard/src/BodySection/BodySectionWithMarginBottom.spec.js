import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children</p>
      </BodySectionWithMarginBottom>
    );

    const divWithMargin = container.querySelector('.bodySectionWithMargin');
    expect(divWithMargin).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    const { getByText } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test children</p>
      </BodySectionWithMarginBottom>
    );

    expect(getByText('test title')).toBeInTheDocument();
    expect(getByText('test children')).toBeInTheDocument();
  });
});
