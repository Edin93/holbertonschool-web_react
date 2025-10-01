import { Component } from 'react';

const WithLogging = (WrappedComponent) => {
    class WithLoggingComponent extends Component {
        componentDidMount() {
            const componentName = WrappedComponent.name
                ? WrappedComponent.name
                : 'Component';
            console.log(`Component ${componentName} is mounted`);
        }
        componentWillUnmount() {
            const componentName = WrappedComponent.name
                ? WrappedComponent.name
                : 'Component';
            console.log(`Component ${componentName} is going to unmount`);
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    WithLoggingComponent.displayName = `WithLogging(${WrappedComponent.name || 'Component'})`;
    return WithLoggingComponent;
};

export default WithLogging;
