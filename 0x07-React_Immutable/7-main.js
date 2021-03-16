import areMapsEqual from './7-equality';
import { Map } from 'immutable';

const map1 = new Map(
  {
    firstName: 'Guillaume',
    lastName: 'Salva',
  }
);
const map2 = new Map(
  {
    firstName: 'Guillaume',
    lastName: 'Salva',
  }
);

let r = areMapsEqual(map1, map2);

console.log('areMapsEqual: ');

console.log(r);
