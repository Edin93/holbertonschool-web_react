import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import CourseListRow from './CourseListRow';

configure({adapter: new Adapter()});

describe("Testing the <CourseListRow /> Component", () => {

	it("Test if it renders one cell with colSpan=2 when textSecondCell doesn't exist and isHeader is true", () => {
		
		let props = {
			isHeader: true,
			textFirstCell: 'dumbstring',
		};

		let component = shallow(<CourseListRow {...props} />);

		expect(component.contains(<tr><th colSpan={2}>{props.textFirstCell}</th></tr>)).to.equal(true);
	});

	it("Test if it renders 2 cells when textSecondCell exists and isHeader is true", () => {
		
		let props = {
			isHeader: true,
			textFirstCell: 'dumbstring',
			textSecondCell: 'dumbstring',
		};

		let component = shallow(<CourseListRow {...props} />);

		expect(component.contains(<tr><th>{props.textFirstCell}</th><th>{props.textSecondCell}</th></tr>)).to.equal(true);
	});

	it("Test if it renders 2 <td> within a <tr> element when isHeader is false", () => {
		
		let props = {
			isHeader: false,
			textFirstCell: 'dumbstring',
			textSecondCell: 'dumbstring',
		};

		let component = shallow(<CourseListRow {...props} />);

		expect(component.contains(<tr><td>{props.textFirstCell}</td><td>{props.textSecondCell}</td></tr>)).to.equal(true);
	});

});
