import { UserForm } from './views/UserForm';
import { User } from './models/User';

const root = 'root';

const form = new UserForm(document.getElementById(root), User.buildUser({ name: 'name', age: 20}));
form.render();