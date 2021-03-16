import { mergeDeeplyElements, } from './6-deeply';

const page1 = {
  'user-1': {
    id: 1,
    name: 'test',
    likes: {
      1: {
        uid: 1234,
      }
    }
  },
};

const page2 = {
  'user-1': {
    likes: {
      2: {
        uid: 134,
      }
    }
  },
};

let r = mergeDeeplyElements(page1, page2).toJS();

console.log(`Result = ${r}`);
