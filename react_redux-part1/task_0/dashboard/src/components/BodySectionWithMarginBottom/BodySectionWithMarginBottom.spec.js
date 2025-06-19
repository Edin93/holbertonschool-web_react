import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const mockBodySection = jest.fn();
jest.mock('../BodySection/BodySection', () => {
  const MockBodySection = (props) => {
    mockBodySection(props);
    return (
      <div>
        <h2>{props.title}</h2>
        {props.children}
      </div>
    );
  };
  MockBodySection.displayName = 'MockBodySection';
  return MockBodySection;
});

describe('BodySectionWithMarginBottom', () => {
  test('Should render BodySection inside a wrapper div with expected content', () => {
    render(
      <BodySectionWithMarginBottom title="Hello!">
        <p>This is child content</p>
        <span>Hey there!</span>
      </BodySectionWithMarginBottom>
    );

    const wrapper = screen.getByTestId('body-section-with-margin');
    expect(wrapper).toBeInTheDocument();

    expect(mockBodySection).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Hello!',
        children: expect.anything(),
      })
    );

    expect(wrapper).toHaveTextContent('Hello!');
    expect(wrapper).toHaveTextContent('This is child content');
    expect(wrapper).toHaveTextContent('Hey there!');

    const pElement = screen.getByText('This is child content');
    const spanElement = screen.getByText('Hey there!');
    expect(pElement).toBeInTheDocument();
    expect(spanElement).toBeInTheDocument();
  });

  test('Should apply a class name that includes "bodySectionWithMargin"', () => {
    render(
      <BodySectionWithMarginBottom title="Test Title">
        <p>Child Content</p>
      </BodySectionWithMarginBottom>
    );

    const wrapper = screen.getByTestId('body-section-with-margin');
    expect(wrapper).toBeInTheDocument();

    expect(wrapper.className).toMatch(/bodySectionWithMargin/);
  });
});
