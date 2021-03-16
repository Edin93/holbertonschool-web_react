import accessImmutableObject from './2-nested';

let r = accessImmutableObject({
	name: {
			 first: "Guillaume",
			 last: "Salva"
	}
}, ['name', 'first']);

console.log(`Result = ${r}`);
