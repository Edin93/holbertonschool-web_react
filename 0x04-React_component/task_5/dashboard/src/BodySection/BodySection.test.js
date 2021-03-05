import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount, } from 'enzyme';
import BodySection from './BodySection.js';

configure({
	adapter: new Adapter()
});

describe("Testing the <BodySection /> Component", () => {

	it("Renders the correct children", () => {
		let wrapper = shallow(
			<BodySection title="test title">
				<p>test children node</p>
			</BodySection>
		);
		expect(wrapper.containsAllMatchingElements([
			<h2>test title</h2>,
			<p>test children node</p>
		])).to.equal(true);
	});

});
