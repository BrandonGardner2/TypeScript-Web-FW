import { UserForm } from './views/UserForm';
import { User } from './models/User';

const root = 'root';
const rootElem = document.getElementById(root);

if (rootElem) {
  const form = new UserForm(rootElem, User.buildUser({ name: 'name', age: 20}));
  form.render();
} else {
  throw new Error('No root element found.');
}