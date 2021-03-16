import { Map } from 'immutable';

const map = Map({
	1: 'Liam',
	2: 'Noah',
	3: 'Elijah',
	4: 'Oliver',
	5: 'Jacob',
	6: 'Lucas',
});

let map2 = map;
map2 = map2.set(2, 'Benjamin');
map2 = map2.set(4, 'Oliver');

export {
	map,
	map2,
}
