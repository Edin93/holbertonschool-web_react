import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

configure({adapter: new Adapter()});

describe("Testing the <CourseList /> Component", () => {

	it("Test if <CourseList /> is rendered without crashing", () => {

		let component = shallow(<CourseList shouldRender />);

		expect(component.render()).to.not.be.an("undefined");
	});

	it("Test if <CourseList /> is rendered without crashing", () => {

		let component = shallow(<CourseList shouldRender />);

		expect(component.find(CourseListRow)).to.have.lengthOf(5);
	});

});
