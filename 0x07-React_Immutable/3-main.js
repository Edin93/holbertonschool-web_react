import { getListObject, addElementToList, } from './3-list';

let array = [10, 20, 30, 40, 50];

let r = getListObject(array);

console.log(`Result = ${r}`);

r = addElementToList(array, 800);

console.log(`array = ${array}`);

console.log(`Result = ${r}`);
