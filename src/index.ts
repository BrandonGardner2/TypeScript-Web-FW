import { Collection } from './models/Collection';

const collection = new Collection('http://localhost:3000');

collection.fetch();
collection.on('change', () => {
  console.log(collection.models);
})