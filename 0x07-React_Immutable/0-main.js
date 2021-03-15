import getImmutableObject from './0-fromjs';

let obj = {
	fear: true,
	smell: -1033575916.9145899,
	wall: false,
	thing: -914767132
};

let r = getImmutableObject(obj);

console.log(r);
