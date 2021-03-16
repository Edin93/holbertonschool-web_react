import { getIn, fromJS } from 'immutable';

export default function accessImmutableObject(object, array) {
  return getIn(fromJS(object), array, undefined);
}
