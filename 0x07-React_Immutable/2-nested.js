import Immutable from 'immutable';

export default function accessImmutableObject(object, array) {
	if (object === null || object === undefined || Object.keys(object).length === 0) {
		return (undefined);
	}
	if (array === null || array === undefined || array.length === 0) {
		return (undefined);
	}
	return Immutable.getIn(object, array, undefined);
};
