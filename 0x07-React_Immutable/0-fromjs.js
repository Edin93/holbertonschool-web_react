const { fromJS } = require('immutable');

const getImmutableObject = (object) => {
	const immutableObj = fromJS(object);
	return (immutableObj);
};

module.exports = {
	getImmutableObject
};
