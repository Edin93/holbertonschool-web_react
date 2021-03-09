import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BodySection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			title,
			children,
		} = this.props;

		return (
			<div className="BodySection">
				<h2>{title}</h2>
				{children}
			</div>
		);
	}
};

BodySection.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node
}

export default BodySection;
