import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import './BodySectionWithMarginBottom.css';

const mockBodySection = jest.fn();
jest.mock('./BodySection', () => {
    return jest.fn().mockImplementation((props) => {
        mockBodySection(props);
        return (
            <div>
                <h2>{props.title}</h2>
                {props.children}
            </div>
        );
    });
});

test('Should render BodySection inside a div with class bodySectionWithMargin', () => {
    const { container } = render(
        <BodySectionWithMarginBottom title="Hello!">
            <p>This is child content</p>
            <span>Hey there!</span>
        </BodySectionWithMarginBottom>
    );

    expect(mockBodySection).toHaveBeenCalled();
    expect(container.firstChild.classList.contains('bodySectionWithMargin')).toBe(true);
    expect(mockBodySection).toHaveBeenCalledWith(
        expect.objectContaining({
            title: "Hello!",
            children: expect.anything(),
        })
    );
    expect(container.firstChild).toHaveTextContent('Hello!');
    const bodySectionWithMargin = container.querySelector('.bodySectionWithMargin');
    expect(bodySectionWithMargin).toHaveTextContent('Hello!');
    expect(bodySectionWithMargin).toHaveTextContent('This is child content');
    expect(bodySectionWithMargin).toHaveTextContent('Hey there!');
    const pElement = container.querySelector('p');
    const spanElement = container.querySelector('span');
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveTextContent('This is child content');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent('Hey there!');
});

test('Should apply margin-bottom of 40px to the div with class bodySectionWithMargin', () => {
    const { container } = render(
        <BodySectionWithMarginBottom title="Test Title">
            <p>Child Content</p>
        </BodySectionWithMarginBottom>
    );
    const divWithMargin = container.querySelector('.bodySectionWithMargin');
    expect(divWithMargin).toBeInTheDocument();
    expect(divWithMargin).toHaveClass('bodySectionWithMargin');
});
