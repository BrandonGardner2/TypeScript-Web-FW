import { UserEdit } from './views/UserEdit';
import { User } from './models/User';

const root = 'root';
const rootElem = document.getElementById(root);

if (rootElem) {
  const form = new UserEdit(rootElem, User.buildUser({ name: 'name', age: 20}));
  form.render();
} else {
  throw new Error('No root element found.');
}