import { getIn } from 'immutable';

export default function accessImmutableObject(object, array) {
	return getIn(object, array, undefined);
};
