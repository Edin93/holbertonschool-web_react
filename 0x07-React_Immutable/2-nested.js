export default function accessImmutableObject(object, array) {
	let i = 0;
	let currentKey = array[i];
	while (i + 1 < array.length && object[currentKey]) {
		object = object[currentKey];
		i += 1;
		currentKey = array[i];
	}
	return (object[currentKey]);
};
