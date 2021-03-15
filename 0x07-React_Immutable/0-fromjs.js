const { fromJS } = require('immutable');

function getImmutableObject(object) {
	const immutableObj = fromJS(object);
	return (immutableObj);
};

export default getImmutableObject;
