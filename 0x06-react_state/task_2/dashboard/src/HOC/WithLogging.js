import React, { Component, Children } from 'react';

class WithLogging extends Component {
	constructor(props) {
		super(props);
	};

	componentDidMount() {
		// console.log(this.props);
		let compName = this.props.children.type.name || 'Component';
		console.log(`Component ${compName} is mounted`);
	};

	componentWillUnmount() {
		let compName = this.props.children.type.name || 'Component';
		console.log(`Component ${compName} is going to unmount`);
	};

	render() {
		return (this.props.children);
	};
};

export default WithLogging;
