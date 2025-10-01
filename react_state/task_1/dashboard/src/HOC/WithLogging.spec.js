import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';


class MockApp extends React.Component {
    render() {
        return <h1>Hello from Mock App Component</h1>;
    }
}

const MockAppWithLogging = WithLogging(MockApp);

describe('WithLogging HOC', () => {
    afterEach(() => {
        cleanup();
    });

    test('Renders a heading element with the text "Hello from Mock App Component"', () => {
        render(<MockAppWithLogging />);
        const headingElement = screen.getByText('Hello from Mock App Component');
        expect(headingElement).toBeInTheDocument();
    });

    test('Logs messages when the component mounts and unmounts', () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const { unmount } = render(<MockAppWithLogging />);
        expect(consoleLogSpy).toHaveBeenCalledWith('Component MockApp is mounted');
        unmount();
        expect(consoleLogSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
        consoleLogSpy.mockRestore();
    });
});
