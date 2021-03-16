import { List, concat } from 'immutable';

export function getListObject(array) {
	return (List(array));
}

export function addElementToList(list, element) {
	return (concat(getListObject(list), element));
}
